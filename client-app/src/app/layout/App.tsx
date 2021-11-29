import React, { Fragment, useEffect, useState } from 'react';  
import axios from 'axios';
import { Container} from 'semantic-ui-react'
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:44319/api/Activities').then(response => {
      setActivities(response.data);
    })
  }, []);

  function handleSelectActivity(id: string){
    setSelectedActivity(activities.find(x => x.id === id)); 
  }
  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }
  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '4.5em'}}>
        <ActivityDashboard 
        activities={activities} 
        selectedActivity={selectedActivity}
        selectActivity={handleSelectActivity}
        cancelSelectActivity={handleCancelSelectActivity}
        />
      </Container>
       
    </Fragment>
  );
}

export default App;
