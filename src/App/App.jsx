import React from 'react';
import { Link } from 'react-router';
import './App.css';

import Debug from 'debug';
var debug = Debug('tshi3:App');

export default class App extends React.Component {

  render() {
    return (
      <div className='app background'>
        <h1 className='ui  blue header'>臺語線頂辨識</h1>
        <ul className="ui list">
          <li><Link to="/">錄音</Link></li>
          <li><Link to="/%e8%be%a8%e8%ad%98">辨識</Link></li>
        </ul>
        {this.props.children }
      </div>
    );
  }
}

App.propTypes = {
  history: React.PropTypes.object,
  children: React.PropTypes.object,
};
