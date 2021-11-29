import React, { Fragment, useEffect, useState } from 'react';  
import axios from 'axios';
import { Container} from 'semantic-ui-react'
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  useEffect(() => {
    axios.get<Activity[]>('https://localhost:44319/api/Activities').then(response => {
      setActivities(response.data);
    })
  }, []);
  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '4.5em'}}>
        <ActivityDashboard activities={activities} />
      </Container>
       
    </Fragment>
  );
}

export default App;
