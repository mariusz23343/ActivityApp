import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";



export default observer( function ActivityList(){
    const [target, setTarget] = useState('');
    const {activityStore} = useStore();
    const {deleteActivity, activitiesByDate, loading} = activityStore;

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id:string){ //ustawiamy target po kliknięciu, a loading ustawiamy wtedy gdy target (id) jest rowny activity ID
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

   

    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => activityStore.selectActivity(activity.id)} floated='right' content='View' color='blue'></Button>
                                <Button
                                 loading={loading && target === activity.id} //bo ustawiony przez setState moze byc tylko jeden na raz
                                 onClick={(e) => handleActivityDelete(e, activity.id)}
                                 floated='right' content='Delete' color='red'
                                 name={activity.id}>                                 
                                 </Button>
                                <Label basic content={activity.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})