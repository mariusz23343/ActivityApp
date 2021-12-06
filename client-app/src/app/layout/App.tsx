import React from 'react';  
import { Container } from 'semantic-ui-react'
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router';
import HomePage from '../home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

function App() {

  const location = useLocation();

  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route 
        path={'/(.+)'} //cokolwiek bedzie dodane po / ma byc renderowane tutaj
        render={() => (
          <>
             <NavBar />
            <Container style={{marginTop: '4.5em'}}>
              <Route exact path="/activities" component={ActivityDashboard} />
              <Route path="/activities/:id" component={ActivityDetails} />
              <Route key={location.key} path={["/createActivity", '/manage/:id']} component={ActivityForm} />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App); // trzeba oznaczyc klase jako observer zeby rerenderowala sie po zmianach
