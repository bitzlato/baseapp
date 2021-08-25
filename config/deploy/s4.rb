# frozen_string_literal: true

set :public_url, "https://#{ENV.fetch( 'STAGING_SERVER_4' )}/"
set :build_domain, ENV.fetch( 'STAGING_SERVER_4' )
set :stage, 's4'
set :application, -> { 'baseapp-' + fetch(:stage).to_s }

server ENV.fetch( 'STAGING_SERVER_4' ), user: fetch(:user), roles: fetch(:roles)
