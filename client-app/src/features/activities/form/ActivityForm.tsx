import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";

export default function ActivityForm(){
    return(
        <Segment clearing>
            <Form>
                <Form.Input praceholder='Title'/>
                <Form.TextArea praceholder='Description'/>
                <Form.Input praceholder='Category'/>
                <Form.Input praceholder='Date'/>
                <Form.Input praceholder='City'/>
                <Form.Input praceholder='Venue'/>
                <Button floated='right' positive type='submit' content='Submit' />
                <Button floated='right' type='submit' content='Cancel' />
            </Form>
        </Segment>
    )
}