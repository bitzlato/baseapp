# frozen_string_literal: true

lock '3.16'

set :user, 'app'
set :application, 'baseapp'

set :roles, %w[app].freeze

set :repo_url, ENV.fetch('DEPLOY_REPO', `git remote -v | grep origin | head -1 | awk  '{ print $2 }'`.chomp) if ENV['USE_LOCAL_REPO'].nil?
set :keep_releases, 10

set :deploy_to, -> { "/home/#{fetch(:user)}/#{fetch(:application)}" }

set :tmp_dir, -> { '/tmp/baseapp_tmp' }

set :disallow_pushing, true

set :db_dump_extra_opts, '--force'

default_branch = 'main'
current_branch = `git rev-parse --abbrev-ref HEAD`.chomp

if ENV.key? 'BRANCH'
  set :branch, ENV.fetch('BRANCH')
elsif default_branch == current_branch
  set :branch, default_branch
else
  ask(:branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp })
end

# set :rbenv_type, :user
# set :rbenv_ruby, File.read('.ruby-version').strip

set :conditionally_migrate, true # Only attempt migration if db/migrate changed - not related to Webpacker, but a nice thing

set :db_local_clean, false
set :db_remote_clean, true

set :app_version, SemVer.find.to_s
set :current_version, `git rev-parse HEAD`.strip

set :bugsnag_api_key, ENV.fetch('BUGSNAG_API_KEY')

if Gem.loaded_specs.key?('capistrano-sentry')
  set :sentry_organization, ENV['SENTRY_ORGANIZATION']
  set :sentry_release_version, -> { [fetch(:app_version), fetch(:current_version)].join('-') }
  before 'deploy:starting', 'sentry:validate_config'
  after 'deploy:published', 'sentry:notice_deployment'
end

set :nvm_node, File.read('.nvmrc').strip
set :nvm_map_bins, %w{node npm yarn rake corepack}

set :default_env, {
  REACT_APP_RELEASE_STAGE: fetch(:stage),
  REACT_APP_SENTRY_KEY:  ENV['SENTRY_KEY'],
  REACT_APP_SENTRY_ORGANIZATION:  ENV['SENTRY_ORGANIZATION'],
  REACT_APP_SENTRY_PROJECT: ENV['SENTRY_PROJECT'],
  REACT_APP_BUGSNAG_KEY: ENV['BUGSNAG_API_KEY'],
  REACT_APP_GIT_SHA: fetch(:current_version),
  BUILD_DOMAIN: fetch(:build_domain),
  PUBLIC_URL: fetch(:public_url),
}

task :yarn_build do
  on roles('app') do
    within release_path do
      execute :yarn, :rebuild
      execute :yarn, :build
      execute :cp, "-R shared/build web/build/shared"
    end
  end
end

after 'deploy:updated', 'yarn_build'

task :link_env do
  on roles('app') do
    within release_path do
      execute :ln, "-s env.#{fetch(:stage)}.js web/public/config/env.js"
    end
  end
end

before 'yarn_build', 'link_env'

task :change_release_path do
  on roles('app') do
    set(:release_path, fetch(:release_path).join('web'))
  end
end

before 'deploy:publishing', 'change_release_path'


if defined? Slackistrano
  Rake::Task['deploy:starting'].prerequisites.delete('slack:deploy:starting')
  set :slackistrano,
      klass: Slackistrano::CustomMessaging,
      channel: ENV['SLACKISTRANO_CHANNEL'],
      webhook: ENV['SLACKISTRANO_WEBHOOK']

  # best when 75px by 75px.
  set :slackistrano_thumb_url, 'https://bitzlato.com/wp-content/uploads/2020/12/logo.svg'
  set :slackistrano_footer_icon, 'https://github.githubassets.com/images/modules/logos_page/Octocat.png'
end

# Removed rake, bundle, gem
# Added rails.
# rake has its own dotenv requirement in Rakefile
set :dotenv_hook_commands, %w{yarn rails ruby}

set :maintenance_dirname, -> { "#{current_path}/public" }
set :maintenance_template_path, File.expand_path('maintenance.html.erb')
set :maintenance_roles, %w{app}
