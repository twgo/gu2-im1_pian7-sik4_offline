# 試錄
[![Build Status](https://travis-ci.org/twgo/gu2-im1_pian7-sik4_offline.svg?branch=master)](https://travis-ci.org/twgo/gu2-im1_pian7-sik4_offline)

## Docker
### 前端
```
docker run --restart=always -d --port 8300:3000 twgo/gu2-im1_pian7-sik4_offline
```
### 後端
`exp.tgz`是模型，`local.py`是設定檔
```
git clone https://github.com/i3thuan5/hok8-bu7.git
cd hok8-bu7/使用範例/Kaldi服務
mv ~/exp.tgz ~/local.py .
tar -xzvf exp.tgz
docker-compose up -d
```

### 開發前端
```
time docker build -t guim .
docker run -ti --port 8300:3000 guim
```

License
-----------

MIT License <http://g0v.mit-license.org/>
