import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'

class MainMenu extends Component {
    constructor() {
        super();

        // events this binding
        this.onSignUp = this.onSignUp.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
        this.onQuestion = this.onQuestion.bind(this);
        this.onHome = this.onHome.bind(this);
    }

    onSignUp(e) {
        e.preventDefault();
        this.props.onSignup();

        //-----------------------------------------------
        //react router , path to /register 
        // in router / resgidter -> component is register.
        //-----------------------------------------------
    }
    onSignIn(e) {
        e.preventDefault();
        this.props.onSignin();
    }

    onQuestion(e) {
        e.preventDefault();
        this.props.onQuestion();
    }

    onHome(e) {
        e.preventDefault();
        this.props.onHome();
    }

    render() {
        return (
            <React.Fragment>
                <div className="ui small menu custom-menu">

                    <div class="header item">Mangathol!</div>

                    <a className="item" onClick={this.onHome}>
                        Home</a>
                    <a className="item" onClick={this.onQuestion}>
                        Questions</a>
                    <div className="right menu">

                        <div className={this.props.signInVisible == true ? 'hide' : ''}>
                            <b> {'Welcome ' + this.props.Candidate} </b>
                        </div>

                        <div className={`item ${this.props.signInVisible == true ? '' : 'hide'}`} >
                            <div id="btnSignIn" className="custom-button" onClick={this.onSignIn} >Sign In</div>
                        </div>
                        <div className={`item ${this.props.signInVisible == true ? '' : 'hide'}`} >
                            <div id="btnSignUp" className="ui basic button" onClick={this.onSignUp}>Sign Up</div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default hot(module)(MainMenu)





