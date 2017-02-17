import React from 'react';
import superagent from 'superagent-bluebird-promise';
import 漢字臺羅 from '../元件/漢字臺羅';
import 錄音控制 from '../元件/錄音控制';
import 音檔表 from '../元件/音檔表';
import 後端 from '../App/後端';

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
    let { 辨識結果 } = this.state;
    if (辨識結果 === undefined) {
      return <div/>;
    }

    let a = 辨識結果.map((結果)=>(<div>{結果.編號} {結果.狀態}</div>))

    let { 音檔 } = this.state;
    return (
    <div className='ui segment'>
       {a}
    </div>
    );
  }
}
