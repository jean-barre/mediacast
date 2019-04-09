#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QItemSelection>
#include <QDebug>
#include "websocketclient.h"

namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private:
    Ui::MainWindow *ui;
    WebSocketClient *client;

signals:
    void updateMedia(QString, QString);

private slots:
    void selectionChanged(const QItemSelection & /*newSelection*/, const QItemSelection & /*oldSelection*/);
};

#endif // MAINWINDOW_H
