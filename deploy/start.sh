#!/usr/bin/env bash
set -e
bundle install
bundle exec rake db:create db:migrate
yarn
if [ "$RAILS_ENV" = "production" ]; then
  bundle exec rails assets:precompile
fi
bundle exec puma -C config/puma.rb