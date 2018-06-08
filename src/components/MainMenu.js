import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'
import CountDownTimer from './CountDownTimer'

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

                    <div className="header item pointer" onClick={this.onHome}>
                        Mangathol!
                            <i aria-hidden="true" className="circle notched loading icon"></i>
                    </div>

                    {/* <a className="item" onClick={this.onHome}>
                        Home</a> */}
                    {/* <a className="item" onClick={this.onQuestion}>
                        Questions</a>*/}

                    <div className="right menu"> 

                        {/* <a className="item">
                            <i aria-hidden="true" className="circle notched loading icon"></i>

                        </a> */}

                        {/* <div className={this.props.signInVisible == true ? 'hide' : 'item'}>
                            <b> {'Welcome ' + this.props.Candidate} </b>
                        </div> */}

                        <CountDownTimer dir="down"></CountDownTimer>
                        


                        <h2 className={this.props.signInVisible == true ? 'hide' : 'ui header'} >
                            <img src="https://react.semantic-ui.com/assets/images/avatar/large/patrick.png"
                                className="ui circular image" /> { this.props.Candidate } &nbsp;
                        </h2>




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





