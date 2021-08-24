# frozen_string_literal: true

set :public_url, 'https://market-s4.bitzlato.com/'
set :build_domain, 'market-s4.bitzlato.com'
set :stage, 's4'
set :application, -> { 'baseapp-' + fetch(:stage).to_s }

server 'market-s4.bitzlato.com', user: fetch(:user), roles: fetch(:roles)
