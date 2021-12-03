import React, { Fragment, useEffect} from 'react';  
import { Container } from 'semantic-ui-react'
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
const {activityStore} = useStore();




  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);



  if(activityStore.loadingInitial) return <LoadingComponent content='Loading app'/>
  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '4.5em'}}>
        <ActivityDashboard />
      </Container>
       
    </Fragment>
  );
}

export default observer(App); // trzeba oznaczyc klase jako observer zeby rerenderowala sie po zmianach
