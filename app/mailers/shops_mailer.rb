class ShopsMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.shops_mailer.synced.subject
  #
  def contact(shop, message)
    @shop = shop
    @shop_email = shop_email(shop)
    @message = message
    mail to: 'bergquist.kenneth@gmail.com', subject: "New #{ENV['SHOPIFY_APP_NAME']} support message"
  end

  private 
  
  def shop_email(shop)
    session = ShopifyAPI::Session.new(@shop.shopify_domain, @shop.shopify_token)
    ShopifyAPI::Base.activate_session(session)
    ShopifyAPI::Shop.current.email
  end
end
