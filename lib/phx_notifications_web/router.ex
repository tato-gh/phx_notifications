defmodule PhxNotificationsWeb.Router do
  use PhxNotificationsWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {PhxNotificationsWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", PhxNotificationsWeb do
    pipe_through :browser

    get "/", PageController, :home
  end

  # Other scopes may use custom stacks.
  # scope "/api", PhxNotificationsWeb do
  #   pipe_through :api
  # end
  #
  scope "/", PhxNotificationsWeb do
    pipe_through [:browser]

    live "/with_sw", NotificationLive, :with_sw
    live "/without_sw", NotificationLive, :without_sw
  end
end
