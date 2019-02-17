class StaticController < ApplicationController
  def privacy_policy
    @app_name = ENV['SHOPIFY_APP_NAME']
  end
end