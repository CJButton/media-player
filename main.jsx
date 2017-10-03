

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Playlist from './playlist';

var App = React.createClass({
  render: function () {
    return(
      <div>
        {this.props.children}
      </div>
    );
  }
});

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Playlist}/>
  </Route>
)

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <Router history={hashHistory}>
      {routes}
    </Router>,
      document.getElementById('root'));
});
