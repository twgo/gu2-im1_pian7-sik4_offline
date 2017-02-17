import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App/App';
// import 錄 from './頁/錄';

import Debug from 'debug';
Debug.enable('tshi3:*');

const root = document.getElementById('app');

let history = browserHistory;
render(
  <div>
    <Router history={history}>
      <Route path='/' component={App}>
      </Route>
    </Router>
  </div>,
  root
  );
