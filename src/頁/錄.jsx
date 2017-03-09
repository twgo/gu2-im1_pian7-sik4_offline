import React from 'react';
import cookie from 'react-cookie';
import superagent from 'superagent-bluebird-promise';
import Debug from 'debug';
import 後端 from '../App/後端';

import 辨識結果 from '../元件/辨識結果';
import 錄好上傳 from '../元件/錄好上傳';
import 錄音控制 from '../元件/錄音控制';
import 音檔表 from '../元件/音檔表';

var debug = Debug('itaigi:錄');

export default class 錄 extends React.Component {
  constructor(props) {
    super(props);
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    let { sampleRate } = new AudioContext();
    this.state = {
        frequency: sampleRate, // 無法度改
        timeInterval: 600 * 1000, // 錄音最長600秒
        channels: 2,
        顯示名: cookie.load('hian2si7_mia5'),
        資料: undefined,
        音檔: [],
        有確定的資料: false,
        當佇送: false,
        上傳好矣: false,
        全部確定的資料: [],
      };
  }

  加音檔(blob) {
    let { 音檔 } = this.state;
    this.setState({ 音檔: [...音檔, blob] });
  }

  送出音檔(blob) {
    let { 有確定的資料, 上傳好矣 } = this.state;

    if (有確定的資料 && !上傳好矣) {
      alert('頂一句猶未上傳成功，請先上傳頂一句。');
      return;
    }

    let { 啥人唸的, 資料, 漢字音標對齊 } = this.state;
    this.setState({
      全部確定的資料: {
        啥人唸的: 啥人唸的,
        確定的音檔: blob,
        漢字音標對齊: 漢字音標對齊,
      },
      有確定的資料: true,
      上傳好矣: false,
    });

    this.錄好的上傳(blob);
    this.setState({ 音檔: [] });
  }

  錄好的上傳(確定的音檔=this.state.全部確定的資料.確定的音檔) {
    this.setState({ 當佇送: true });
    this.fileReader = new FileReader();
    this.fileReader.onload = function () {
        let encoded_blob = btoa(new Uint8Array(this.fileReader.result));
        let { 全部確定的資料 } = this.state;
        superagent.post(後端.辦識音檔())
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .send({
            語言: '閩南語',
            blob: encoded_blob,
          })
          .then(({ body })=>(
            this.setState({ 當佇送: false, 上傳好矣: true })
          ))
          .catch((err) => (
            debug(err),
            alert('上傳失敗，麻煩檢查網路或回報錯誤～'),
            this.setState({ 當佇送: false })
          ));
        // this.setState({ 當佇送: false, 上傳好矣: true });
      }.bind(this);

    this.fileReader.readAsArrayBuffer(確定的音檔);
  }

  render() {
    let { frequency, timeInterval, channels, 顯示名, 音檔, 資料, 漢字音標對齊 } = this.state;
    let { 有確定的資料, 當佇送, 上傳好矣, 全部確定的資料 } = this.state;
    return (
      <div className='app container'>
        <div className='ui segment'>
          <h2>開始錄音</h2>
          <錄音控制 frequency={frequency} timeInterval={timeInterval} channels={channels}
            加音檔={this.加音檔.bind(this)}/>

          <音檔表 音檔={音檔} 送出音檔={this.送出音檔.bind(this)} />
        </div>
          <錄好上傳
            錄好的上傳={this.錄好的上傳.bind(this)}
            確定的資料={全部確定的資料}
            有確定的資料={有確定的資料} 當佇送={當佇送} 上傳好矣={上傳好矣}/>
        <辨識結果 />
      </div>
      );
    
  }
}
