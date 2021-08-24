# frozen_string_literal: true

set :public_url, 'https://market-s3.bitzlato.com/'
set :build_domain, 'market-s3.bitzlato.com'
set :stage, 's3'
set :application, -> { 'baseapp-' + fetch(:stage).to_s }

server 'market-s3.bitzlato.com', user: fetch(:user), roles: fetch(:roles)
