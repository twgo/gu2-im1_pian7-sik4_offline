import React from 'react';
import Debug from 'debug';
import superagent from 'superagent-bluebird-promise';
import 後端 from '../App/後端';

var debug = Debug('itaigi:錄好上傳');

export default class 錄好上傳 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      當佇送: false,
      請求數: 0,
      上傳檔名: "選擇檔案..."
    };
  }

  componentDidUpdate() {
    if (this.state.請求數 == 3) {
      this.fileInput.value = '';
      this.setState({
        當佇送: false,
        請求數: 0,
        上傳檔名: "選擇檔案..."
      });
    }
  }

  handleClick(e) {
    let fileInput = this.fileInput;
    let 音檔 = fileInput.files[0];
    this.fileReader = new FileReader();
    this.fileReader.onload = function () {
        let encoded_blob = btoa(new Uint8Array(this.fileReader.result));
        this.setState({
          當佇送: true,
          請求數: 0
        });
        this.送出音檔('臺語', encoded_blob);
        this.送出音檔('華語', encoded_blob);
        this.送出音檔('臺華', encoded_blob);
      }.bind(this);
    this.fileReader.readAsArrayBuffer(音檔);
  }

  送出音檔(語言, encoded_blob) {
    superagent.post(後端.辦識音檔())
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({
        語言,
        blob: encoded_blob,
      })
      .then((body)=>{
        this.setState((prevState) => {
          return {請求數: prevState.請求數 + 1};
        })
      })
      .catch((err) => (
        debug(err),
        alert('上傳失敗，麻煩檢查網路或回報錯誤～')
      ));
  }

  handleFileChange(e) {
    let 上傳檔名 = e.target.files.item(0).name || "選擇檔案...";
    this.setState({上傳檔名});
  }

  render() {
    return (
      <div className="ui basic segment">
        <label htmlFor="upload-photo" className="ui labeled icon button">
          <i className="folder open outline icon"/>{this.state.上傳檔名}</label>
        <input
          id="upload-photo"
          type="file"
          ref={(input) => { this.fileInput = input; }}
          onChange={this.handleFileChange.bind(this)}/>
        <button
          className="ui blue labeled icon button"
          onClick={this.handleClick.bind(this)}
          disabled={this.state.當佇送}>
            <i className="upload icon"/>上傳</button>
      </div>
    );
  }
}
