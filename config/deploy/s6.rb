# frozen_string_literal: true

set :public_url, "https://#{ENV.fetch( 'STAGING_SERVER_6' )}/"
set :build_domain, ENV.fetch( 'STAGING_SERVER_6' )
set :stage, 's6'
set :application, -> { 'baseapp-' + fetch(:stage).to_s }
set :deploy_to, -> { "/home/#{fetch(:user)}/#{fetch(:stage)}/#{fetch(:application)}" }

server ENV.fetch( 'STAGING_SERVER_6' ), user: fetch(:user), roles: fetch(:roles)

