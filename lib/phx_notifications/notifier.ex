defmodule PhxNotifications.Notifier do
  use GenServer

  def start_link(_args) do
    GenServer.start_link(__MODULE__, [], name: __MODULE__)
  end

  def run(sec, {data_json, subscription}) do
    GenServer.cast(__MODULE__, {:run, {sec, {data_json, subscription}}})
  end

  @impl true
  def init(_args) do
    {:ok, %{}}
  end

  @impl true
  def handle_cast({:run, {sec, {data_json, subscription}}}, state) do
    Process.sleep(sec * 1000)
    WebPushEncryption.send_web_push(data_json, subscription)

    {:noreply, state}
  end
end
