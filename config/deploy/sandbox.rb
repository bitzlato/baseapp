# frozen_string_literal: true

set :public_url, "https://#{ENV.fetch( 'SANDBOX_HOST' )}/"
set :build_domain, ENV.fetch( 'SANDBOX_HOST' )
set :stage, 'sandbox'
set :application, -> { 'baseapp-' + fetch(:stage).to_s }
set :deploy_to, -> { "/home/#{fetch(:user)}/#{fetch(:stage)}/#{fetch(:application)}" }

server ENV.fetch( 'STAGING_SERVER' ), user: fetch(:user), roles: fetch(:roles)

before 'link_env', 'link_auth0'