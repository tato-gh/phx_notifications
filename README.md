# PhxNotifications

通知習作

## 環境変数

PUSH_SUBJECT
PUSH_PUBLIC_KEY
PUSH_PRIVATE_KEY

各値のサンプルは `mix web_push.gen.keypair` で生成できる。

### Flyioへのデプロイ

公開鍵の変数はビルド時に必要なため、deply時に指定する必要がある。

`flyctl deploy --build-secret PUSH_PUBLIC_KEY=foo`

