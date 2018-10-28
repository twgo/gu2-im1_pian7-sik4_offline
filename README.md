# 試錄-上線版本
[![Build Status](https://travis-ci.org/twgo/gu2-im1_pian7-sik4_offline.svg?branch=master)](https://travis-ci.org/twgo/gu2-im1_pian7-sik4_offline)

## Docker
### 前端
```
docker run --name guim --restart=always -d -p 8300:3000 twgo/gu2-im1_pian7-sik4_offline
```

### 後端
`exp.tgz`是模型，`local.py`是設定檔、`s5c-8k`是8k script檔、`s5c-8k-huagi`是華語8k script檔、
```
git clone https://github.com/i3thuan5/hok8-bu7.git
cd hok8-bu7/使用範例/Kaldi服務
mv ~/exp.tgz ~/local.py .
tar -xzvf exp.tgz
docker-compose up -d

docker exec -i -w /usr/local/hok8-bu7/kaldi/egs/taiwanese hok8-bu7_pian7sik4_1 tar -xzvf - s5c-8k < s5c-8k.tgz
docker exec -i -w /usr/local/hok8-bu7/kaldi/egs/taiwanese hok8-bu7_pian7sik4_1 tar -xzvf - s5c-8k-huagi < s5c-8k-huagi.tgz
```

### 開發前端
```
time docker build -t guim .
docker run -ti -p 8300:3000 guim
```

### 事前準備
```
docker exec -w /usr/local/hok8-bu7/kaldi/egs/taiwanese hok8-bu7_pian7sik4_1 tar -czvf - s5c-8k > s5c-8k.tgz
docker exec -w /usr/local/hok8-bu7/kaldi/egs/taiwanese hok8-bu7_pian7sik4_1 tar -czvf - s5c-8k-huagi > s5c-8k-huagi.tgz
```

License
-----------

MIT License <http://g0v.mit-license.org/>
