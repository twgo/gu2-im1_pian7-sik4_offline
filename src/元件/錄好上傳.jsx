import React from 'react';
import Debug from 'debug';
import request from 'superagent-bluebird-promise';
import 後端 from '../App/後端';

var debug = Debug('itaigi:錄好上傳');

export default class 錄好上傳 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      當佇送: false,
      上傳檔名: "選擇檔案...",
      encoded_blob: null
    };
  }

  handleClick(e) {
    let 音檔 = this.fileInput.files[0];
    this.fileReader = new FileReader();
    this.fileReader.onload = function () {
        let encoded_blob = btoa(new Uint8Array(this.fileReader.result));
        this.送出所有語言的請求(encoded_blob);
      }.bind(this);
    this.fileReader.readAsArrayBuffer(音檔);
  }

  送出所有語言的請求(encoded_blob) {
    this.setState({
        encoded_blob,
        當佇送: true
    });
    let promise臺語 = this.送出音檔('臺語');
    let promise華語 = this.送出音檔('華語');
    let promise臺華 = this.送出音檔('臺華');
    Promise.all([promise臺華, promise華語, promise臺語])
      .then(()=>{
        console.log("all the files were created");
          this.fileInput.value = '';
          this.setState({
            當佇送: false,
            上傳檔名: "選擇檔案..."
          });
      }).catch((e, status) => {
          console.log("error occurred", e, status);
          this.fileInput.value = '';
          this.setState({
            當佇送: false,
            上傳檔名: "選擇檔案..."
          });
      });
  }
  送出音檔(語言) {
    let { encoded_blob } = this.state;
    //return request promise
    return request.post(後端.辦識音檔())
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({
        語言,
        blob: encoded_blob,
      }).promise();
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
