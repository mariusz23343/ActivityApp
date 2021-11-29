import React, { Fragment, useEffect, useState } from 'react';  
import axios from 'axios';
import { Container} from 'semantic-ui-react'
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

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
  function handleFormOpen(id?: string){
     id ? handleSelectActivity(id) :  handleCancelSelectActivity();
     setEditMode(true);
  }
  function handleFormClose(){
    setEditMode(false);
  }
  function handleCreateOrEditActivity(activity: Activity){
    activity.id //patrzymy czy mamy id
    ? setActivities([...activities.filter(x =>x.id !== activity.id), activity]) //jesli tak to filtrujemy po obecnych aktywnościach, i na aktywnosci o id danym aktualizujemy plus dodajemy poprzednie
    : setActivities([...activities, {...activity, id: uuid()}]); //jesli nie mamy takiej aktywnosci to dodajemy i dodajemy poprzednie 
    setEditMode(false);
    setSelectedActivity(activity);
  }
  return (
    <Fragment>
      <NavBar openForm={handleFormOpen} />
      <Container style={{marginTop: '4.5em'}}>
        <ActivityDashboard 
        activities={activities} 
        selectedActivity={selectedActivity}
        selectActivity={handleSelectActivity}
        cancelSelectActivity={handleCancelSelectActivity}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        createOrEdit = {handleCreateOrEditActivity}
        />
      </Container>
       
    </Fragment>
  );
}

export default App;
