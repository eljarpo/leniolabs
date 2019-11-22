import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Switch, Route } from 'react-router-dom';
import 'react-skeleton-css/styles/skeleton.2.0.4.css'
import './App.css'
import Layout from './hoc/Layout'
import { connect } from 'react-redux'
import * as actions from './store/actions'

import CongressList from './components/CongressList'
import CongressMember from './components/CongressMember'
function App(props) {
  useEffect(function fetchMembers() {
    props.onFetchMembers('116', 'senate')
  });
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
const mapDispatchToProps= (dispatch)=>{
      
  return{
      onFetchMembers: (congress, chamber) => dispatch(actions.fetchMembers(congress, chamber)),
  }
}
export default connect(null, mapDispatchToProps)(App);
