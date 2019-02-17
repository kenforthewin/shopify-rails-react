module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_shop

    def connect
      self.current_shop = get_shop
    end

    private

    def get_shop
      if shop = Shop.find(env['rack.session'][:shopify])
        shop.id
      else
        reject_unauthorized_connection
      end
    end
  end
end