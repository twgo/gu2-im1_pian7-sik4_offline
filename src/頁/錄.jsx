import React from 'react';
import Debug from 'debug';

import 錄音控制 from '../元件/錄音控制';
import 音檔表 from '../元件/音檔表';

var debug = Debug('itaigi:錄');

export default class 錄 extends React.Component {
  constructor(props) {
    super(props);
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    this.state = {
        myAudioContext: new AudioContext(), // 無法度改
        timeInterval: 600 * 1000, // 錄音最長600秒
        channels: 1,
        資料: undefined,
        音檔: [],
        有確定的資料: false,
        當佇送: false,
        上傳好矣: false,
        全部確定的資料: [],
      };
  }

  componentWillUnmount(){
    this.state.myAudioContext.close();
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

    let { 啥人唸的, 資料 } = this.state;
    this.setState({
      全部確定的資料: {
        啥人唸的: 啥人唸的,
        確定的音檔: blob,
      },
      有確定的資料: true,
      上傳好矣: false,
    });

    this.錄好的上傳(blob);
    this.setState({ 音檔: [] });
  }

  render() {
    let { myAudioContext, timeInterval, channels, 顯示名, 音檔, 資料 } = this.state;
    let { 有確定的資料, 當佇送, 上傳好矣, 全部確定的資料 } = this.state;
    return (
      <div className='app container'>
        <div className='ui basic segment'>
          <錄音控制 frequency={myAudioContext.sampleRate} timeInterval={timeInterval} channels={channels}
            加音檔={this.加音檔.bind(this)}/>
          <音檔表 音檔={音檔}/>
        </div>
      </div>
      );

  }
}
