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
    mainQml = parent;
    player = new QMediaPlayer;
    player->setVolume(50);
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
        sendJsonMessage("id", "player");
    } else if (type == QString("radio")) {
        if (data == QString("meuh")) {
            playRadio("http://radiomeuh.ice.infomaniak.ch/radiomeuh-128.mp3");
            QMetaObject::invokeMethod(mainQml, "updateMedia", Q_ARG(QVariant, "Radio Meuh"));
        } else if (data == QString("sympa")) {
            playRadio("http://radio2.pro-fhi.net:9095/index.html/stream;");
            QMetaObject::invokeMethod(mainQml, "updateMedia", Q_ARG(QVariant, "La Radio Sympa"));
        }
    } else if (type == QString("youtube")) {

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

// QMediaPlayer object is not handled by Qt for WebAssembly yet.
void WebSocketClient::playRadio(QString url)
{
    player->setMedia(QUrl(url));
    player->play();
}
