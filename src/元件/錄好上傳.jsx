import React from 'react';
import Debug from 'debug';
import request from 'superagent-bluebird-promise';
import Promise from 'bluebird';
import 後端 from '../App/後端';

var debug = Debug('itaigi:錄好上傳');

let 送出音檔 = item => (
  request.post(後端.辦識音檔())
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({
      語言: item.語言,
      blob: item.encoded_blob,
    })
    .then(function(value){
        console.log('request info', value)
    })
)

export default class 錄好上傳 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      當佇送: false,
      上傳檔名: "選擇檔案...",
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
        當佇送: true
    });
    Promise.each([{
//        語言: '2017臺華', encoded_blob
//      },{
//        語言: '2017華語', encoded_blob
 //     },{
//        語言: '2017臺語', encoded_blob
//      },{
//        語言: '2018華語-8K-加詞', encoded_blob
//      },{
//        語言: '2018臺語-16K-TDNN', encoded_blob
//      },{
//        語言: '2018臺語-16K-TDNN-加詞', encoded_blob
//      },{
//        語言: '2018臺語-16K-TDNN-加詞2', encoded_blob
//      },{
        語言: '2018臺語-16K-TDNNF-VP', encoded_blob
 //     },{
//        語言: '2018臺語-8K-TDNN', encoded_blob
//      },{
//        語言: '2018臺語-8K-TDNN-加詞2', encoded_blob
//      },{
//        語言: '2018華語-8K-TDNNF-VP', encoded_blob
//      },{
//        語言: '2018臺語-8K-TDNNF-VP', encoded_blob
//      },{
//        語言: '2018臺語-8K-TDNNF-VP-加詞2-seven', encoded_blob
      }], (item)=>(送出音檔(item))
    ).then(()=>{
          console.log("All the requests were sent");
          this.fileInput.value = '';
          this.setState({
            當佇送: false,
            上傳檔名: "選擇檔案..."
          });
      }).catch((e, status) => {
          console.log("Error occurred", e, status);
          this.fileInput.value = '';
          this.setState({
            當佇送: false,
            上傳檔名: "選擇檔案..."
          });
      });
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
