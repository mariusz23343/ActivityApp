import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button, Label, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import {v4 as uuid} from 'uuid';
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";

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
    
    const validationSchema = Yup.object({
        title: Yup.string().required('Activity title is required!'),
        description: Yup.string().required('Description is required!'),
        category: Yup.string().required(),
        date: Yup.string().required(),
        venue: Yup.string().required(),
        city: Yup.string().required(),

    })

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
            <Formik
             validationSchema={validationSchema}
             enableReinitialize 
             initialValues={activity} 
             onSubmit={values => console.log(values)}
             >
                {({handleSubmit}) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput placeholder="Title" name="title" />
                    <MyTextInput placeholder='Description' name='description' />
                    <MyTextInput placeholder='Category'  name='category' />
                    <MyTextInput placeholder='Date'  name='date' />
                    <MyTextInput placeholder='City'  name='city' />
                    <MyTextInput placeholder='Venue'  name='venue' />
                    <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                    <Button as={Link} to='/activities' floated='right' type='submit' content='Cancel' />
                </Form>
                )}
            </Formik>
            
        </Segment>
    )
})