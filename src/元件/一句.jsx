import React from 'react';
import 後端 from '../App/後端';
import 一詞 from '../元件/一詞';

import Debug from 'debug';
var debug = Debug('tshi3:一句');

export default class 一句 extends React.Component {

  render() {
    let { 分詞, 漢字, 臺羅閏號調, 注音符號 } = this.props.標音;
    let 拼音 = 臺羅閏號調 || (注音符號 || null);

    if (分詞 && 漢字 && 拼音) {
      let 分詞陣列 = 分詞.split(' ');
      let 漢字陣列 = 漢字.split(' ');
      let 臺羅陣列 = 拼音.replace(/--/g, " --").trim().split(' ');

      let 詞 = 分詞陣列.map((分詞, i)=>(
        <一詞 key={i}
          漢字={漢字陣列[i]} 臺羅={臺羅陣列[i]} />
      ));
      return (
        <div className='tai5'>
          {詞}
        </div>
      );
    } else {
      return null;
    }
  }
}
