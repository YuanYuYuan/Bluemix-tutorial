# 7688 Duo Setup

## TTY login

|Pins on USB adapter|Pins to be connected on 7688|
|-------------------|----------------------------|
|RX  			    |8 						     |
|TX                 |9                           |
|GND                |GND                         |

Connect with GNU Screen.

```sh
screen /dev/ttyUSB0 57600
```

## Setup wifi 

Edit /etc/config/wireless.

```sh
config wifi-iface 'sta'
        option device 'radio0'
        option mode 'sta'
        option network 'wan'
        option ifname 'apcli0'
        option led 'mediatek:orange:wifi'
        option disabled '0'
        option ssid '<ssid>'
        option key '<key>'
        option encryption 'psk2'
```

Restart wifi and check.

```sh
wifi
ping 8.8.8.8
```

## (Optional) Enable WiFi AP mode and Station mode simultaneously.

Edit /lib/netifd/wireless/ralink.sh. 

Add the line sta_disabled=1 after ralink.sh checked sta status to enable ap mode.

```sh
sed -i '/sta_disabled=/a\\tsta_disabled=1' /lib/netifd/wireless/ralink.sh
wifi
```

