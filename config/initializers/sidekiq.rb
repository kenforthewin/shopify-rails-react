  require 'sidekiq/web'
  require 'sidekiq-scheduler'
  redis_url = "redis://redis:6379"
  
  Sidekiq.configure_server do |config|
    config.redis = { url: redis_url }
    # config.on(:startup) do
    #   Sidekiq.schedule = YAML.load_file(Rails.root.join('config', 'schedule.yml'))
    #   SidekiqScheduler::Scheduler.instance.reload_schedule!
    # end
  end

  Sidekiq.configure_client do |config|
    config.redis = { url: redis_url }
  end
