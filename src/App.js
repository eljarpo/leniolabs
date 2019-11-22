import React from 'react';
import Button from '@material-ui/core/Button';
import { Switch, Route } from 'react-router-dom';
import 'react-skeleton-css/styles/skeleton.2.0.4.css'
import './App.css'
import Layout from './hoc/Layout'

import CongressList from './components/CongressList'
import CongressMember from './components/CongressMember'
function App() {
  const routes = (<Switch>
    <Route path='/members/:id' component={CongressMember} />
    <Route exact path='/' component={CongressList} />
  </Switch>)
  return (
    <div>
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}

export default App;
