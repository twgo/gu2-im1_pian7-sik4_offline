import React from 'react';
import superagent from 'superagent-bluebird-promise';
import 後端 from '../App/後端';
import 漢字臺羅 from './漢字臺羅';

import Debug from 'debug';
var debug = Debug('tshi3:辨識結果');

export default class 辨識結果 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      顯示幾个: this.預設顯示幾个(),
    };
  }

  componentWillMount() {
    this.查怎樣講();
    this.timer = setInterval(this.查怎樣講.bind(this), 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  預設顯示幾个() {
    return 30;
  }

  加顯示幾个() {
    return 10;
  }

  看閣較濟全開() {
    let { 顯示幾个 } = this.state;
    顯示幾个 += this.加顯示幾个();
    this.setState({ 顯示幾个 });
  }

  查怎樣講() {
    superagent.post(後端.辦識結果())
          .then(({ body })=>(
            this.setState(body)
          ))
          .catch((err) => (
            debug(err)
          ));

  }

  看閣較濟() {
    if (this.state.辨識結果.length > this.state.顯示幾个)
    return (
        <button onClick={this.看閣較濟全開.bind(this)}
          className='ui button'>
          看閣較濟
        </button>
      );
  }

  render() {
    let { 辨識結果 } = this.state;
    if (辨識結果 === undefined) {
      return <div/>;
    }

    let 辨識漢字臺羅 = 辨識結果.slice(0, this.state.顯示幾个).map((結果, i)=>(<漢字臺羅 key={i} 結果={結果}/>));

    let { 音檔 } = this.state;
    return (
    <div className='ui segment'>
      <h2>辨識結果</h2>
       {辨識漢字臺羅}
       {this.看閣較濟()}
    </div>
    );
  }
}
