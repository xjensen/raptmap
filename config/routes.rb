Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :topics, only: [:autocomplete] do
    collection do
      get :autocomplete, defaults: { format: 'json' }
    end
  end

  resources :locations, only: [:autocomplete] do
    collection do
      get :autocomplete, defaults: { format: 'json' }
    end
  end

  scope "(:locale)", locale: /en|ja/ do
    resources :subscriptions, except: [:destroy], param: :uid do
      collection do
        get :search
        post :results
      end
    end

    resources :rich_subscriptions, except: [:destroy, :index], param: :uid

    resources :simple_search, except: [:destroy], param: :uid

    get '/unsubscribe', to: 'cancellations#new'
    post '/unsubscribe', to: 'cancellations#submit'
    get '/unsubscribing', to: 'cancellations#sent'
    get '/unsubscribe/:unsubscribe_uid', to: 'cancellations#destroy', as: 'unsubscriber'

    get '/about', to: 'static_pages#about'
    get '/privacy', to: 'static_pages#privacy'
  end

  get '/test_ip', to: 'subscriptions#test_ip'

  mount_griddler '/incoming/mail'

  get '/t/:topic_uid/l/:location_uid', to: 'subscriptions#search'
  get '/t/:topic_uid', to: 'subscriptions#search'

  get '/l/:location_uid/t/:topic_uid', to: 'subscriptions#search'
  get '/l/:location_uid', to: 'subscriptions#search'

  # get '/simple', to: 'subscriptions#new', defaults: { map: false }, as: :simple_form
  # get '/map', to: 'subscriptions#new', defaults: { map: true }, as: :map
  get '/:locale', to: 'subscriptions#search'
  root 'rich_subscriptions#new'

  match '*any', to: 'application#options', :via => [:options]

end
