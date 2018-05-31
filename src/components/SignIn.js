import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'
import { Container, Button, Header, Image, Modal, Form } from 'semantic-ui-react'

class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            showSignIn: false
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.closeSignIn = this.closeSignIn.bind(this);
        this.openSignIn = this.openSignIn.bind(this);

    }

    componentWillReceiveProps(newProp) {
        console.log('from sign in page newProp : ' ,newProp.showSignIn)
        console.log('from sign in page showSignIn : ' ,this.state.showSignIn)

        if (newProp.showSignIn !== this.state.showSignIn) {
            this.setState({ showSignIn: newProp.showSignIn });
        }
    }

    closeSignIn(e) {
        if (e != undefined) {
            e.preventDefault();
        }
        this.setState((prevState) => ({ showSignIn: false }))
        this.clear();
    }

    openSignIn(e) {
        if (e != undefined) {
            e.preventDefault();
        }
        this.setState((prevState) => ({ showSignIn: true }))
        this.clear();
    }

    clear() {
        if (this.refs.email) {
            this.refs.email.value = "";
            this.refs.password.value = "";
        }
    }

    onSubmit(e) {
        e.preventDefault();
        fetch('/api/user/signin',{
            method :"POST",
            body : JSON.stringify({
                email : this.refs.email.value,
                password : this.refs.password.value
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(result => result.json())
        .then((res)=>{
            if(res.meta.status == "success"){
                console.log(res);
                this.props.setUser(res);
            }
        })
        .catch((err)=>{
            console.log(err);
        });
        this.closeSignIn();
    }

    render() {
        return (
            <React.Fragment>

                <Container text>
                    <Modal open={this.state.showSignIn} onClose={this.closeSignIn} onOpen={this.openSignIn}>
                        <Modal.Header>Sign In</Modal.Header>
                        <Modal.Content image>
                            <Image wrapped size='medium' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzPJIuh2CwM7VFCJxvqb0KC6mrzym16cFEkgToCDuszjVwUA2nFA' />
                            <Modal.Description>
                                <Header>Please use your email & password</Header>
                                <Form style={{ width: "520px" }}>
                                    <Form.Field>
                                        <label>Email</label>
                                        <input placeholder='Email' ref="email" />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Password</label>
                                        <input placeholder='First Name' ref="password" />
                                    </Form.Field>
                                    <Button type='submit' onClick={this.onSubmit}> Log me in  </Button>
                                </Form>
                            </Modal.Description>
                        </Modal.Content>
                    </Modal>
                </Container>

            </React.Fragment>
        );
    }
}

export default hot(module)(SignIn)