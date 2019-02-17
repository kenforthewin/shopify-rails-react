class HomeController < ShopifyApp::AuthenticatedController
  before_action :authorize_shop

  def index
    @auth_token = session[:_csrf_token]
  end

  private

  def authorize_shop
    @shop = Shop.find(session[:shopify])
    session = ShopifyAPI::Session.new(@shop.shopify_domain, @shop.shopify_token)
    ShopifyAPI::Base.activate_session(session)
    charge = ShopifyAPI::RecurringApplicationCharge.current

    redirect_to activate_path unless charge
  end
end
