import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";
import { useStore } from "../stores/store";


export default observer(function HomePage(){

    const {userStore} = useStore();

    return(
        <Segment inverted textalgn='center' vertical className='masthead'>
            <Container text>
                <Header inverted as='h1'>
                    <Image size='massive' src='/assets/logo.png'  alt='logo' style={{marginBottom: 12}} />
                    ActivityApp
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content='Welcome to ActivityApp' />
                        <Button as={Link} to='/activities' size='huge' inverted>
                        Go To Activities!
                        </Button>
                    </>
                   
                ) : (
                    <Button as={Link} to='/login' size='huge' inverted>
                    Login
                    </Button>
                )}
            </Container>
        </Segment>
    )
})