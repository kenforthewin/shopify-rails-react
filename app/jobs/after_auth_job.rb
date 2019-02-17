class AfterAuthJob < ApplicationJob
  queue_as :default
  
  def perform(shop_domain:)
    shop = Shop.find_by(shopify_domain: shop_domain)
  end
end
