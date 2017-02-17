export default class 後端  {
  static 網址() {
    //return 'http://localhost:8000/';
    return 'http://vcac-16144.iis.sinica.edu.tw/';
  }

  static 辦識音檔() {
    return encodeURI(this.網址() + '辦識音檔');
  }

  static 辦識結果() {
    return encodeURI(this.網址() + '辦識結果');
  }

  static 聽音檔(音檔) {
    return encodeURI(this.網址() + '資料庫影音檔案/') + 音檔;
  }

}
