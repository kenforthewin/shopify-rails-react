class SendSupportEmailJob
  include Sidekiq::Worker

  def perform(shop_id, message)
    shop = Shop.find(shop_id)
    ShopsMailer.contact(shop, message).deliver
  end
end
