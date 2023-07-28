defmodule PhxNotifications.HttpClient do
  # Call from WebPushEncryption
  def post(endpoint, body, headers, _options) do
    req = Req.new(url: endpoint, headers: headers, body: body)

    Req.post!(req)
  end
end
