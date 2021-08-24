# frozen_string_literal: true

set :public_url, 'https://market-s5.bitzlato.com/'
set :build_domain, 'market-s5.bitzlato.com'
set :stage, 's5'
set :application, -> { 'baseapp-' + fetch(:stage).to_s }

server 'market-s5.bitzlato.com', user: fetch(:user), roles: fetch(:roles)
