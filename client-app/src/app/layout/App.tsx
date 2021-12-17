import React, { useEffect } from 'react';  
import { Container } from 'semantic-ui-react'
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router';
import HomePage from '../home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/activities/Errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/activities/Errors/notFound';
import ServerError from '../../features/activities/Errors/ServerError';
import LoginForm from '../../features/activities/users/LoginForm';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';

function App() {

  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() =>{
    if(commonStore.token){
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded()
    }
  }, [commonStore, userStore])


  if(!commonStore.appLoaded) return <LoadingComponent content='Loading app...'/>

  return (
    <>
    <ToastContainer position="bottom-right" hideProgressBar />
      <Route exact path="/" component={HomePage} />
      <Route 
        path={'/(.+)'} //cokolwiek bedzie dodane po / ma byc renderowane tutaj
        render={() => (
          <>
             <NavBar />
            <Container style={{marginTop: '4.5em'}}>
              <Switch>
                <Route exact path="/activities" component={ActivityDashboard} />
                <Route path="/activities/:id" component={ActivityDetails} />
                <Route key={location.key} path={["/createActivity", '/manage/:id']} component={ActivityForm} />
                <Route path='/errors' component={TestErrors} />
                <Route path='/server-error' component={ServerError} />
                <Route path='/login' component={LoginForm} />
                <Route component={NotFound} />
              </Switch> 
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App); // trzeba oznaczyc klase jako observer zeby rerenderowala sie po zmianach
