Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  
  root :to => 'home#index'
  get 'me', :to => 'shops#me'
  post 'support', :to => 'shops#contact'
  get 'shops/callback', to: 'shops#callback', as: :shops_callback
  get 'shops/activate', to: 'shops#activate_and_redirect', as: :activate
  get 'privacy-policy', to: 'static#privacy_policy'
  mount ShopifyApp::Engine, at: '/'
end
