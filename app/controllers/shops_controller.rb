class ShopsController < ShopifyApp::AuthenticatedController
  before_action :get_shop
  def me
    render json: {
      initial_sync: true
    }
  end

  def activate
    session = ShopifyAPI::Session.new(@shop.shopify_domain, @shop.shopify_token)
    ShopifyAPI::Base.activate_session(session)
    charge = ShopifyAPI::RecurringApplicationCharge.create(
      name: ENV['SHOPIFY_APP_NAME'],
      price: ENV['SHOPIFY_PRICE'].to_f,
      return_url: shops_callback_url,
      test: @shop.shopify_domain == 'doggo-emporium.myshopify.com',
      trial_days: 7
    )

    @confirmation_url = charge.confirmation_url
  end

  def activate_and_redirect
    activate
    redirect_to @confirmation_url
  end


  def contact
    SendSupportEmailJob.perform_async(@shop.id, params[:message])

    render json: {
      ok: true
    }
  end

  def callback
    @shop = Shop.find(session[:shopify])
    session = ShopifyAPI::Session.new(@shop.shopify_domain, @shop.shopify_token)
    ShopifyAPI::Base.activate_session(session)
    charge = ShopifyAPI::RecurringApplicationCharge.find(params[:charge_id])
    charge.activate
    flash[:info] = 'Thank you for signing up.'
    redirect_to root_path
  end

  def contact
    SendSupportEmailJob.perform_async(@shop.id, params[:message])

    render json: {
      ok: true
    }
  end

  private

  def get_shop
    @shop = Shop.find(session[:shopify])
  end
end
