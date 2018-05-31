import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'
import { Container, Button, Header, Image, Modal, Form } from 'semantic-ui-react'

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            showSignUp: false
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.closeSignUp = this.closeSignUp.bind(this);
        this.openSignUp = this.openSignUp.bind(this);
        
    }

    componentWillReceiveProps(newProp) {
        if (newProp.showSignUp !== this.state.showSignUp) {
            this.setState({ showSignUp: newProp.showSignUp });
        } 
        else{
        }
    }

    closeSignUp(e) {
        if (e != undefined) {
            e.preventDefault();
        }
        this.setState((prevState) => ({ showSignUp: false }))
        this.clear();
    }

    openSignUp(e) {
        if (e != undefined) {
            e.preventDefault();
        }
        this.setState((prevState) => ({ showSignUp: true }))
        this.clear();
    }

    clear() {
        if (this.refs.firstName) {
            this.refs.firstName.value = "";
            this.refs.lastName.value = "";
            this.refs.email.value = "";
        }
    }

    onSubmit(e) {
        e.preventDefault();
        fetch('/api/user/save', {
            method: "POST",
            body: JSON.stringify({
                firstName: this.refs.firstName.value,
                lastName: this.refs.lastName.value,
                email: this.refs.email.value,
                college: 0
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        // resolve is not working !!! how to do that ?
        // .then , .then  then close this modal ;)

        this.closeSignUp();
    }

    render() {
        return (
            <React.Fragment>

                <Container text>
                    <Modal open={this.state.showSignUp} onClose={this.closeSignUp}>
                        <Modal.Header>Sign Up</Modal.Header>
                        <Modal.Content image>
                            <Image wrapped size='medium' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzPJIuh2CwM7VFCJxvqb0KC6mrzym16cFEkgToCDuszjVwUA2nFA' />
                            <Modal.Description>
                                <Header>Please fill all the fields</Header>
                                <Form style={{ width: "520px" }}>
                                    <Form.Field>
                                        <label>First Name</label>
                                        <input placeholder='First Name' ref="firstName" />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Last Name</label>
                                        <input placeholder='Last Name' ref="lastName" />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Email</label>
                                        <input placeholder='Email' ref="email" />
                                    </Form.Field>
                                    <Button type='submit' onClick={this.onSubmit}> Submit </Button>
                                </Form>
                                {/* <p>We've found the following gravatar image associated with your e-mail address.</p>
                                <p>Is it okay to use this photo?</p> */}
                            </Modal.Description>
                        </Modal.Content>
                    </Modal>
                </Container>

            </React.Fragment>
        );
    }
}

export default hot(module)(SignUp)