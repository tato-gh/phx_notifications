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

  defp apply_action(socket, :without_sw) do
    socket
    |> assign(form: to_form(%{"waiting_sec" => 1, "message" => "テスト"}))
  end

  defp apply_action(socket, :with_sw) do
    socket
    |> assign(form: to_form(%{"waiting_sec" => 5, "message" => "テスト"}))
  end

  defp get_hook(:with_sw), do: "NotificationWithSW"
  defp get_hook(:without_sw), do: "NotificationWithoutSW"
end
