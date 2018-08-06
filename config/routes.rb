Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :update] do
      resources :tracks, only: [:index]
      resources :albums, only: [:index]
    end
    resources :tracks do
      resources :comments, only: [:create, :update, :destroy]
      resources :likes, only: [:create, :destroy]
    end
    resources :albums, only: [:create, :show, :destroy]
    resource :session, only: [:create, :destroy]
  end
  patch '/api/trackplays/:id', to: 'api/tracks#increment_plays'
end
