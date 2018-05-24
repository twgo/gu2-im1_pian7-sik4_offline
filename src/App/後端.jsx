export default class 後端  {
  static 網址() {

    //return 'http://localhost:8000/';

    // https://服務.意傳.台灣/
    return 'https://xn--lhrz38b.xn--v0qr21b.xn--kpry57d';
  }

  static 辦識音檔() {
    return encodeURI(this.網址() + '/辨識音檔');
  }

  static 辦識結果() {
    return encodeURI(this.網址() + '/辨識結果');
  }

  static 聽音檔(音檔) {
    return encodeURI(this.網址() + 音檔);
  }

}
