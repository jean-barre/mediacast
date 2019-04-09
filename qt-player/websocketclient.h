#ifndef WEBSOCKETCLIENT_H
#define WEBSOCKETCLIENT_H

#include <QObject>
#include <QtWebSockets/QWebSocket>
#include <QtMultimedia/QMediaPlayer>
#include <QJsonDocument>
#include <QJsonObject>

class WebSocketClient : public QObject
{
    Q_OBJECT
public:
    explicit WebSocketClient(const QUrl &url, bool debug = false, QObject *parent = nullptr);

Q_SIGNALS:
    void closed();

private Q_SLOTS:
    void onConnected();
    void onTextMessageReceived(QString message);

private:
    QWebSocket m_webSocket;
    QUrl m_url;
    bool m_debug;
    QObject *mainQml;
    void handleMessage(QJsonObject);
    void sendJsonMessage(QString, QString);
    void playRadio(QString);
    QMediaPlayer *player;
};

#endif // WEBSOCKETCLIENT_H
