# frozen_string_literal: true

set :stage, :production
set :user, 'app'
set :public_url, 'https://arnika.lgk.one/'
set :build_domain, 'arnika.lgk.one'
set :deploy_to, -> { "/home/#{fetch(:user)}/#{fetch(:application)}_shared" }

server ENV.fetch( 'PRODUCTION_SERVER_ARNIKA' ),
       user: fetch(:user),
       roles: fetch(:roles),
       ssh_options: { forward_agent: true }
