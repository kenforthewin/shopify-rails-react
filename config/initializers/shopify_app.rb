ShopifyApp.configure do |config|
  config.application_name = ENV['SHOPIFY_APP_NAME']
  config.api_key = ENV['SHOPIFY_API_KEY']
  config.secret = ENV['SHOPIFY_SECRET']
  config.scope = "read_orders" # Consult this page for more scope options:
                                 # https://help.shopify.com/en/api/getting-started/authentication/oauth/scopes
  config.embedded_app = true
  config.after_authenticate_job = false
  config.session_repository = Shop
  config.after_authenticate_job = { job: AfterAuthJob }
end
