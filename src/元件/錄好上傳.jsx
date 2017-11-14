import React from 'react';
import Debug from 'debug';
import superagent from 'superagent-bluebird-promise';
import 後端 from '../App/後端';

var debug = Debug('itaigi:錄好上傳');

export default class 錄好上傳 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      當佇送: false
    };
  }

  componentDidUpdate() {
    if (this.state.當佇送 == false) {
      this.fileInput.value = '';
    }
  }

  handleClick(e) {
    let fileInput = this.fileInput;
    let 音檔 = fileInput.files[0];
    this.setState({ 當佇送: true });
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
            this.setState({ 當佇送: false })
          ))
          .catch((err) => (
            debug(err),
            alert('上傳失敗，麻煩檢查網路或回報錯誤～'),
            this.setState({ 當佇送: false })
          ));
      }.bind(this);

    this.fileReader.readAsArrayBuffer(音檔);
  }


  render() {
    return (
      <section>
        <input
          type="file"
          ref={(input) => { this.fileInput = input; }}/>
        <button
          className="ui compact blue labeled icon button"
          onClick={this.handleClick.bind(this)}
          disabled={this.state.當佇送}>
            <i className="upload icon"/>上傳</button>
      </section>
    );
  }
}
