#include "tablemodel.h"

TableModel::TableModel(QObject *parent): QAbstractTableModel(parent)
{

}

int TableModel::rowCount(const QModelIndex &parent) const
{
    return 3;
}

int TableModel::columnCount(const QModelIndex &parent) const
{
    return 1;
}

QVariant TableModel::data(const QModelIndex &index, int role) const
{
    switch (role) {
    case Qt::DisplayRole:
        if (index.column() == 1) {
            return QString("PLAY");
        } else {
            switch (index.row()) {
            case 0:
                return QString("RadioMeuh");
            case 1:
                return QString("La Radio Sympa");
            case 2:
                return QString("YouTube");
            }
        }
    break;
    }

    return QVariant();
}

QVariant TableModel::headerData(int section, Qt::Orientation orientation, int role) const
{
    if (role == Qt::DisplayRole && orientation == Qt::Horizontal) {
        switch (section) {
        case 0:
            return QString("Media");
        }
    }
    return QVariant();
}
