import React from 'react';
import superagent from 'superagent-bluebird-promise';
import 後端 from '../App/後端';
import 漢字臺羅 from './漢字臺羅';

import Debug from 'debug';
var debug = Debug('tshi3:辨識結果');

class 辨識結果 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      顯示幾个: 100,
    };
  }

  componentWillMount() {
    this.取得辨識結果();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  加顯示幾个() {
    return 10000;
  }

  看閣較濟全開() {
    let { 顯示幾个 } = this.state;
    顯示幾个 += this.加顯示幾个();
    this.setState({ 顯示幾个 });
  }

  取得辨識結果() {
    superagent.get(後端.辦識結果())
      .query({
        數量: 10000,
      })
		.then(({ body })=>(
        this.setState(body)
      ))
      .catch((err) => {
        console.log('hihi', err)
        debug(err)
      });
  }

  辨識漢字臺羅() {
    let { 辨識結果 } = this.state;
    let 陣列 = null;
    if(辨識結果){
      陣列 = 辨識結果.slice(0, this.state.顯示幾个)
		   .filter( 結果=>  結果.語言=='2018臺語8k加詞2')
        .map((結果, i)=>{
        return (<漢字臺羅 key={i} 結果={結果}/>);
      });
    }
    return 陣列;
  }

  看閣較濟() {
    let { 辨識結果 } = this.state;
    if (辨識結果 && 辨識結果.length > this.state.顯示幾个)
    return (
        <button onClick={this.看閣較濟全開.bind(this)}
          className='ui button'>
          看閣較濟
        </button>
      );
  }

  render() {
    return (
    <div className='ui basic segment'>
      {this.辨識漢字臺羅()}
      {this.看閣較濟()}
    </div>
    );
  }
}

export default 辨識結果;
