import React from 'react';
import Debug from 'debug';
import superagent from 'superagent-bluebird-promise';
import 辨識結果 from '../元件/辨識結果';
import 錄好上傳 from '../元件/錄好上傳';
import 後端 from '../App/後端';
var debug = Debug('itaigi:辨識');

class 辨識 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      當佇送: false,
      上傳好矣: false
    };
  }

  handleClick(e) {
    let fileInput = this.fileInput;
    let 音檔 = fileInput.files[0];
    this.setState({ 當佇送: true, 上傳好矣: false });
    this.fileReader = new FileReader();
    this.fileReader.onload = function () {
        let encoded_blob = btoa(new Uint8Array(this.fileReader.result));
        let { 全部確定的資料 } = this.state;
        superagent.post(後端.辦識音檔())
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .send({
            語言: '臺語',
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
      }.bind(this);

    this.fileReader.readAsArrayBuffer(音檔);
  }

  render(){
    return (
    <div className='app container'>
      <h2>辨識</h2>
      <section>
        <input
          type="file"
          ref={(input) => { this.fileInput = input; }}/>
        <button onClick={this.handleClick.bind(this)}>上傳</button>
        {/*<錄好上傳
            錄好的上傳={this.錄好的上傳.bind(this)}
            確定的資料={全部確定的資料}
            有確定的資料={有確定的資料} 當佇送={當佇送} 上傳好矣={上傳好矣}/>*/}
      </section>
      <辨識結果/>
    </div>
    );
  }
}

export default 辨識;
