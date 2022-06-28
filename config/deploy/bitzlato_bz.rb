# frozen_string_literal: true

set :stage, 'production_bz'
set :user, 'baseapp'
set :public_url, 'https://bitzlato.bz/'
set :build_domain, 'bitzlato.bz'
set :deploy_to, -> { "/home/#{fetch(:user)}/#{fetch(:application)}_bz" }

server ENV.fetch( 'PRODUCTION_SERVER' ),
       user: fetch(:user),
       roles: fetch(:roles),
       ssh_options: { forward_agent: true }
