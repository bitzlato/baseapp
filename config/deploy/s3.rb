# frozen_string_literal: true

set :public_url, "https://#{ENV.fetch( 'STAGING_SERVER_3' )}/"
set :build_domain, ENV.fetch( 'STAGING_SERVER_3' )
set :stage, 's3'
set :application, -> { 'baseapp-' + fetch(:stage).to_s }
set :deploy_to, -> { "/home/#{fetch(:user)}/#{fetch(:stage)}/#{fetch(:application)}" }

server ENV.fetch( 'STAGING_SERVER_3' ), user: fetch(:user), roles: fetch(:roles)

