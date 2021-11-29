# frozen_string_literal: true

set :public_url, "https://#{ENV.fetch( 'STAGING_SERVER_2' )}/"
set :build_domain, ENV.fetch( 'STAGING_SERVER_2' )
set :stage, 's2'
set :application, -> { 'baseapp-' + fetch(:stage).to_s }
set :deploy_to, -> { "/home/#{fetch(:user)}/#{fetch(:stage)}/#{fetch(:application)}" }

server ENV.fetch( 'STAGING_SERVER_2' ), user: fetch(:user), roles: fetch(:roles)

before 'link_env', 'link_auth0'
