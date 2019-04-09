#include "websocketclient.h"

WebSocketClient::WebSocketClient(const QUrl &url, bool debug, QObject *parent) :
    QObject(parent),
    m_url(url),
    m_debug(debug)
{
    if (m_debug)
        qDebug() << "WebSocket server:" << url;
    connect(&m_webSocket, &QWebSocket::connected, this, &WebSocketClient::onConnected);
    connect(&m_webSocket, &QWebSocket::disconnected, this, &WebSocketClient::closed);
    m_webSocket.open(QUrl(url));
}

void WebSocketClient::onConnected()
{
    if (m_debug)
        qDebug() << "WebSocket connected";
    connect(&m_webSocket, &QWebSocket::textMessageReceived,
            this, &WebSocketClient::onTextMessageReceived);
}

void WebSocketClient::onTextMessageReceived(QString message)
{
    QJsonObject jsonObject;
    QJsonDocument jsonDoc = QJsonDocument::fromJson(message.toUtf8());
    // check validity of the document
        if(!jsonDoc.isNull()) {
            if(jsonDoc.isObject()) {
                handleMessage(jsonDoc.object());
            } else {
                qDebug() << "Document is not an object" << endl;
            }
        } else {
            qDebug() << "Invalid JSON...\n" << message << endl;
        }
}

void WebSocketClient::handleMessage(QJsonObject object)
{
    qDebug() << "Handling message: " << object;
    QString type = object.value("type").toString();
    QString data = object.value("data").toString();
    if (type == QString("connection ACK")) {
        sendJsonMessage("id", "control");
    }
}

void WebSocketClient::sendJsonMessage(QString type, QString data)
{
    QJsonObject object;
    object["type"] = type;
    object["data"] = data;
    qDebug() << "Sending message: " << object;

    QJsonDocument document(object);
    m_webSocket.sendTextMessage(document.toJson());
}
