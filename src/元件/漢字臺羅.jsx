import React from 'react';
import Debug from 'debug';
import 後端 from '../App/後端';
import 一个詞 from '../元件/一个詞';

var debug = Debug('tshi3:漢字臺羅');

export default class 漢字臺羅 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let { 編號, 網址,狀態, 分詞, 綜合標音 } = this.props.結果;
    if (狀態 != '成功') {
      return (
        <div>
          第 {編號} 句 
          <audio
            src={後端.聽音檔(網址)}
            type="audio/wav" controls>
          </audio>
          {狀態}
      </div>);
    }

    let 分詞陣列 = [];
    let 漢字陣列 = [];
    let 臺羅陣列 = [];
    綜合標音.map(function (標音) {
      let { 分詞, 漢字, 臺羅閏號調 } = 標音;
      if (分詞 && 漢字 && 臺羅閏號調) {
        分詞陣列 = 分詞陣列.concat(分詞.split(' '));
        漢字陣列 = 漢字陣列.concat(漢字.split(' '));
        臺羅陣列 = 臺羅陣列.concat(臺羅閏號調.split(' '));
      }
    });

    let 詞 = 分詞陣列.map((分詞, i)=>(
      <一个詞 key={i}
        分詞={分詞} 漢字={漢字陣列[i]} 臺羅={臺羅陣列[i]} />
    ));

    return (
      <div>
        第 {編號} 句 
        <audio
          src={後端.聽音檔(網址)}
          type="audio/wav" controls>
        </audio>
        辦識完成<br/>
        {分詞}<br/>
      </div>
    );
  }
}
