export default class 後端  {
  static 網址() {
    // return 'http://private-f0474-tai5uan5gian5gi2phing5thai5.apiary-mock.com/';
     return 'http://localhost:8000/';
    return 'https://db.itaigi.tw/';
  }

  static 辦識音檔() {
    return encodeURI(this.網址() + '辦識音檔');
  }

  static 例句列表() {
    return encodeURI(this.網址() + '辦識結果');
  }

}
