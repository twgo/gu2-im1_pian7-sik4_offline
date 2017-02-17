import React from 'react';
import 後端 from './後端';

import './App.css';

import Debug from 'debug';
var debug = Debug('tshi3:App');

export default class App extends React.Component {

  render() {
    return (
      <div className='app background'>
        <h1 className='ui  blue header'>臺語線頂錄音</h1>
        {
          React.cloneElement(this.props.children)
        }
      </div>
    );
  }
}

App.propTypes = {
  history: React.PropTypes.object,
  children: React.PropTypes.object,
};
