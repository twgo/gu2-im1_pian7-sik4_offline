import React from 'react';
import 後端 from '../App/後端';
import './一詞.css';

import Debug from 'debug';
var debug = Debug('tshi3:一詞');

export default class 一詞 extends React.Component {

  render() {
    let { 漢字, 臺羅 } = this.props;

    return (
      <ruby>
        {臺羅}
        <rt> {漢字} </rt>
      </ruby>
    );
  }
}
