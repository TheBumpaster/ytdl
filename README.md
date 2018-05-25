# YTDL
YouTube Downloader on NodeJS for desktop

## NWJS
www.nwjs.io

## Install

Download nwjs (latest)


Clone YTDL

### Windows
Create shortcut -> 


name: YouTube Downloader


target: c:/nwjs/nw.exe c:/nwjs/master_ytdl

### Linux 
Create .desktop file ->
( You need to install nw.deb )

```
[Desktop Entry]
Type=Application
Exec=nw /path/to/master_ytdl
Icon=/path/to/master_ytdl/icon.png
Name=YouTube Downloader
GenericName=YTDL
Categories=Network;
```

If you see this error:

```
nw: error while loading shared libraries: libudev.so.0: cannot open shared object file: No such file or directory
```

Please read [The solution of lacking libudev.so.0](https://github.com/nwjs/nw.js/wiki/The-solution-of-lacking-libudev.so.0)


