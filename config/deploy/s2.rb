# frozen_string_literal: true

set :public_url, 'https://market-s2.bitzlato.com/'
set :build_domain, 'market-s2.bitzlato.com'
set :stage, 's2'
set :application, -> { 'baseapp-' + fetch(:stage).to_s }

server 'market-s2.bitzlato.com', user: fetch(:user), roles: fetch(:roles)
