#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include "websocketclient.h"

int main(int argc, char *argv[])
{
    QCoreApplication::setAttribute(Qt::AA_EnableHighDpiScaling);

    QGuiApplication app(argc, argv);

    QQmlApplicationEngine engine;
    engine.load(QUrl(QStringLiteral("qrc:/main.qml")));
    if (engine.rootObjects().isEmpty())
        return -1;

    WebSocketClient client(QUrl(QStringLiteral("ws://localhost/ws")), true, engine.rootObjects().at(0));

    return app.exec();
}
