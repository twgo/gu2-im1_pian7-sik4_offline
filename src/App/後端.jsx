export default class 後端  {
  static 網址() {
     return 'http://localhost:8000/';
    return 'https://db.itaigi.tw/';
  }

  static 辦識音檔() {
    return encodeURI(this.網址() + '辦識音檔');
  }

  static 辦識結果() {
    return encodeURI(this.網址() + '辦識結果');
  }

}
