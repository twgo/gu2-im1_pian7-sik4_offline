import React from 'react';
import { Link } from 'react-router';
import './App.css';

import Debug from 'debug';
var debug = Debug('tshi3:App');

export default class App extends React.Component {
  constructor(){
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='ui main container'>
        <div className="ui massive secondary pointing blue menu">
          <div className="blue header item">
            臺語線頂辨識
          </div>
          <Link className={"item " + (this.props.location.pathname=="/"? "active": "")} to="/">錄音</Link>
          <Link className={"item " + (this.props.location.pathname=="/%e8%be%a8%e8%ad%98"? "active": "")}
          to="/%e8%be%a8%e8%ad%98">辨識</Link>
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
