# frozen_string_literal: true

set :stage, :production
set :user, 'baseapp'
set :public_url, 'https://bitzlato.com/'
set :build_domain, 'bitzlato.com'
set :deploy_to, -> { "/home/#{fetch(:user)}/#{fetch(:application)}_shared" }

server ENV.fetch( 'PRODUCTION_SERVER' ),
       user: fetch(:user),
       roles: fetch(:roles),
       ssh_options: { forward_agent: true }
