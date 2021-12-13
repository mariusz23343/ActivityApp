import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import {v4 as uuid} from 'uuid';
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";

export default observer( function ActivityForm(){

    const history = useHistory()
    const {activityStore} = useStore();
    const {createActivity, updateActivity, loading, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();
    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: '',
    });
    
    useEffect(() => {
        if(id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity])
    
    // function handleSubmit(){
    //     if(activity.id.length === 0){
    //         let newActivity = {
    //             ...activity,
    //             id: uuid()
    //         }
    //         createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
    //     } else {
    //         updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
    //     }
        
    // }

    // function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){ //odbieranie eventu changeEvent przy zmianach
    //     const {name, value} = event.target; //to wskazuje ze sledzimy te dwa elementy
    //     setActivity({...activity, [name]: value}); //trzy kropki ze zostawiamy istniejące, zmieniamy te co sie zienily name na value ktore im odpowiada
    // }

    if(loadingInitial) return <LoadingComponent content='Loading Activities...' />

    return(
        <Segment clearing>
            <Formik enableReinitialize initialValues={activity} onSubmit={values => console.log(values)}>
                {({handleSubmit}) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <Field placeholder='Title'  name='title' />
                    <Field placeholder='Description' name='description' />
                    <Field placeholder='Category'  name='category' />
                    <Field placeholder='Date' type='date' name='date' />
                    <Field placeholder='City'  name='city' />
                    <Field placeholder='Venue'  name='venue' />
                    <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                    <Button as={Link} to='/activities' floated='right' type='submit' content='Cancel' />
                </Form>
                )}
            </Formik>
            
        </Segment>
    )
})