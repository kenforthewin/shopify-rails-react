class ShopChannel < ApplicationCable::Channel
  def subscribed
    stream_for current_shop
  end
end
