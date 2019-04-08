import QtQuick 2.9
import QtQuick.Window 2.2

Window {
    visible: true
    width: 640
    height: 480
    title: qsTr("MediaCast Player")
    color: "#FDF6C0"

    Rectangle {
        id: rectangle
        anchors.fill: parent

        Text {
            id: title
            color: "#0e175a"
            text: "PLAYER"
            font.bold: true
            font.pointSize: 23
            anchors.top: parent.top
            anchors.topMargin: 20
            anchors.horizontalCenter: parent.horizontalCenter
        }

        Text {
            id: media
            color: "#0e175a"
            text: "No Media Selected"
            font.pointSize: 18
            anchors.top: title.bottom
            anchors.topMargin: 20
            anchors.horizontalCenter: parent.horizontalCenter
        }
    }

    function updateMedia(mediaName) {
        media.text = mediaName
    }
}
