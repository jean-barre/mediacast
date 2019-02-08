# mediacast

## Intention
A media center project over the local network.
This media center is made of one or several players and one or several
controllers.

Use case #1: a player asks one or more players to play the webradio
'La Radio Sympa'.

Use case #2: a player asks one or more players to play the webradio 'Radio Meuh'.

Use case #3: a player asks one or more players to play a YouTube video.

## Technology behind
A unique host of the local network runs an Apache server to make accessible both
player and controller web applications. In order to enable communication from
controllers to players, a NodeJS WebSocket server is running on beside the
Apache one.

## Linux Setup

### Install Apache, NodeJS and the project
Install Apache (version 2.4 or earlier) and NodeJS.
```shell
~/projects $ sudo apt-get install apache2
~/projects $ sudo apt-get install nodejs
```

Clone the mediacast project and install the NodeJS WebSocket module.
```shell
~/projects $ git clone https://github.com/jean-barre/mediacast.git
~/projects $ cd mediacast
~/projects/mediacast $ npm init
~/projects/mediacast $ npm install websocket
```

### Activate the new local website
In order to setup your Apache virtual host to make your web application
reachable from the local network, we will copy the configuration file from the
resources, enable the proxy modules, enable the new configuration and re/start
the Apache service.

Prior to this you may have to edit the configuration file in order to target the
right DocumentRoot, to give the right accesses and set the proxy ip address to
your server host.
Please see lines 4, 7, 21 and 22 of res/mediacast.conf.

```shell
~/projects/mediacast $ cp res/mediacast.conf /etc/apache2/sites-available
~/projects/mediacast $ sudo a2enmod proxy
~/projects/mediacast $ sudo a2enmod proxy_wstunnel
~/projects/mediacast $ sudo a2ensite mediacast.conf
~/projects/mediacast $ sudo systemctl restart apache2
```

### Run
Run the NodeJS server:
```shell
~/projects/mediacast $ node ws/server.js
```

On the device you want to display the player, open a web browser and target the
address: `host_ip/player.html`.
On the device you want to control, open a web browser and target the address
`host_ip`.
