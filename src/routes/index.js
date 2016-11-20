import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/App';
import TraceList from '../containers/TraceList';
import TraceDetail from '../containers/TraceDetail';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={TraceList} />
    <Route path='trace/:id' component={TraceDetail} />
  </Route>
);
