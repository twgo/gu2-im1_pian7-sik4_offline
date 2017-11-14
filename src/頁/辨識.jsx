import React from 'react';
import Debug from 'debug';
import 辨識結果 from '../元件/辨識結果';

var debug = Debug('itaigi:辨識');

class 辨識 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    return (
    <div className='app container'>
      <辨識結果/>
    </div>
    );
  }
}

export default 辨識;
