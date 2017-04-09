import React from 'react';
import { Route, IndexRoute } from 'react-router';
import StandardLayout from '../layouts/StandardLayout';
import Traces from '../containers/Traces';
import TraceDetail from '../containers/TraceDetail';

export default (
  <Route path="/" component={StandardLayout}>
    <IndexRoute component={Traces} />
    <Route path="/trace/:id" component={TraceDetail} />
  </Route>
);
