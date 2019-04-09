#include "mainwindow.h"
#include "ui_mainwindow.h"
#include "tablemodel.h"

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    TableModel *model = new TableModel();
    ui->myTableView->setModel(model);
    ui->myTableView->update();
    QItemSelectionModel *selectionModel = ui->myTableView->selectionModel();
    connect(selectionModel, &QItemSelectionModel::selectionChanged,
                this, &MainWindow::selectionChanged);
    client = new WebSocketClient (QUrl(QStringLiteral("ws://localhost:1337")), true);
    connect(this, &MainWindow::updateMedia, client, &WebSocketClient::sendJsonMessage);
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::selectionChanged(const QItemSelection &, const QItemSelection &)
{
    const QModelIndex index = ui->myTableView->selectionModel()->currentIndex();
    switch(index.row()) {
    case 0:
        emit updateMedia("radio", "meuh");
        break;
    case 1:
        emit updateMedia("radio", "sympa");
        break;
    case 2:
        emit updateMedia("youtube", "");
        break;
    }
}
