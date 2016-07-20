# 7688 setup

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

## Congigure the USB sound card.

```sh
opkg update
opkg install kmod-usb-audio
aplay -l
aplay -D plughw:1,0 <audio-file.wav>
```

Choose the USB sound card and tune the volume with alsamixer.

```sh
alsamixer
```

## Extend root file system to SD card.


List orginal space on-board flash.

```sh
df -h
```

Install the required packages.

```sh
opkg update
opkg install block-mount kmod-fs-ext4 kmod-usb-storage-extras e2fsprogs fdisk
```

Insert the SD card and format it to ext4 file system.

```sh
mkfs.ext4 /dev/mmcblk0
```

Duplicate the root file system to SD card.

```sh
mount /dev/mmcblk0 /mnt
tar -C /overlay -cvf - . | tar -C /mnt -xf -
umount /mnt
```

Congiure the fstab.

change the target option to '/overlay', and the enabled option to '1'.

```sh
block detect > /etc/config/fstab
vi /etc/config/fstab
```

Reboot and check the new space.

```sh
reboot
df -h
```
