defmodule PhxNotificationsWeb.NotificationLive do
  use PhxNotificationsWeb, :live_view

  @impl true
  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  @impl true
  def handle_params(_params, _url, socket) do
    {:noreply,
      socket
      |> apply_action(socket.assigns.live_action)}
  end

  @impl true
  def handle_event("submit", params, socket) do
    {:noreply,
      socket
      |> push_event("send", params)}
  end

  @impl true
  def handle_event("send_from_server", params, socket) do
    data_json = build_send_data(params["message"])
    subscription = build_subscription(params["subscription"])
    sec = String.to_integer(params["waiting_sec"])

    # ブラウザを閉じても動く確認のため別プロセスで実行
    PhxNotifications.Notifier.run(sec, {data_json, subscription})

    {:noreply, socket}
  end

  defp apply_action(socket, :without_sw) do
    socket
    |> assign(page_title: "ServiceWorkerなし")
    |> assign(form: to_form(%{"waiting_sec" => 1, "message" => "テスト"}))
  end

  defp apply_action(socket, :with_sw) do
    socket
    |> assign(page_title: "ServiceWorkerあり")
    |> assign(form: to_form(%{"waiting_sec" => 5, "message" => "テスト"}))
  end

  defp get_hook(:with_sw), do: "NotificationWithSW"
  defp get_hook(:without_sw), do: "NotificationWithoutSW"

  defp build_subscription(params) do
    %{
      endpoint: params["endpoint"],
      keys: %{
        p256dh: params["keys"]["p256dh"],
        auth: params["keys"]["auth"],
      },
    }
  end

  defp build_send_data(message) do
    Jason.encode!(%{
      "title" => "SWからの通知",
      "body" => message,
      "link" => "http://localhost/",
      "mydata" => "何かほかのデータ"
    })
  end
end
