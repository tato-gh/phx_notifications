defmodule PhxNotifications.HttpClient do
  # Call from WebPushEncryption
  def post(endpoint, body, headers, _options) do
    # for iOS 16.4
    headers = Map.put(headers, "Urgency", "normal")
    req = Req.new(url: endpoint, headers: headers, body: body)

    Req.post!(req)
  end
end
