import React from 'react';
import { Link } from 'react-router';
import './App.css';

import Debug from 'debug';
var debug = Debug('tshi3:App');

export default class App extends React.Component {

  render() {
    return (
      <div className='ui main container'>
        <h1 className='ui  blue header'>臺語線頂辨識</h1>
        <div className="ui horizontal bulleted list">
          <Link className="item" to="/">錄音</Link>
          <Link className="item" to="/%e8%be%a8%e8%ad%98">辨識</Link>
        </div>
        {this.props.children }
      </div>
    );
  }
}

App.propTypes = {
  history: React.PropTypes.object,
  children: React.PropTypes.object,
};
