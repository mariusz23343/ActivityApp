import React from 'react';  
import { Container } from 'semantic-ui-react'
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router';
import HomePage from '../home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

function App() {

  return (
    <>
      <NavBar />
      <Container style={{marginTop: '4.5em'}}>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/activities" component={ActivityDashboard} />
        <Route path="/activities/:id" component={ActivityDetails} />
        <Route path={["/createActivity", '/manage/:id']} component={ActivityForm} />
      </Container>
       
    </>
  );
}

export default observer(App); // trzeba oznaczyc klase jako observer zeby rerenderowala sie po zmianach
