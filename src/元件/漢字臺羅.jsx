import React from 'react';
import Debug from 'debug';
import 後端 from '../App/後端';
import 一句 from '../元件/一句';

var debug = Debug('tshi3:漢字臺羅');

export default class 漢字臺羅 extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let { 編號, 網址, 狀態, 分詞, 綜合標音 } = this.props.結果;
    if (狀態 != '成功') {
      return (
        <div>
          第 {編號} 句
          <audio
            src={後端.聽音檔(網址)}
            type="audio/wav" controls>
          </audio>
          {狀態}
      </div>
      );
    }

    let 一句陣列 = 綜合標音.map((標音,i) =>(<一句 key={i} 標音={標音}/>));
    return (
      <div>
        第 {編號} 句
        <audio
          src={後端.聽音檔(網址)}
          type="audio/wav" controls>
        </audio>
        辦識完成<br/>
        {一句陣列}<br/>
      </div>
    );
  }
}
