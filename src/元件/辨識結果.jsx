import React from 'react';
import superagent from 'superagent-bluebird-promise';
import 漢字臺羅 from '../元件/漢字臺羅';
import 錄音控制 from '../元件/錄音控制';
import 音檔表 from '../元件/音檔表';

import Debug from 'debug';
var debug = Debug('tshi3:辨識結果');

export default class 辨識結果 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      };
  }


  componentWillMount() {
    this.查怎樣講()
    this.timer = setInterval(this.查怎樣講.bind(this), 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  查怎樣講(){
    superagent.get(後端.辦識結果())
          .then(({ body })=>(
            this.setState(body)
          ))
          .catch((err) => (
            debug(err)
          ));
      
  }
  render() {
    debug(this.state)
    let { frequency, timeInterval, channels, 名, 資料, 漢字音標對齊, 送出音檔 } = this.props;
    if (資料 === undefined) {
      return <div/>;
    }

    if (漢字音標對齊 === undefined) {
      return (
        <div className='ui segment'>
          <div className="ui active inline loader"/>
        </div>
        );
    }

    let { 音檔 } = this.state;
    return (
    <div className='ui segment'>
      <漢字臺羅 編號={資料.編號} 漢字音標對齊={漢字音標對齊}/>
      <br/>
      <錄音控制 frequency={frequency} timeInterval={timeInterval} channels={channels}
        加音檔={this.加音檔.bind(this)}/>

      <音檔表 音檔={音檔} 送出音檔={送出音檔.bind(this)} />
    </div>
    );
  }
}
