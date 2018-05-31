import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'
import Question from './Question'
import Admin from './Admin'
import MainMenu from './MainMenu'
import SignUp from './SignUp'
import SignIn from './SignIn'

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isHomeVisible: true,
            isQuestionVisible: false,
            isAdminVisible: false,
            isRegisterVisible: false,
            isSignInVisible: false,
            isUserAuthenticated: false,

            candidate : '',
            questionSet :[]
           
        }
        this.onSignUp = this.onSignUp.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
        this.onQuestion = this.onQuestion.bind(this);
        this.onHome = this.onHome.bind(this);
        this.setUserAuthentication = this.setUserAuthentication.bind(this);


    }

    // set user after successfull athentication 
    // this will get called only after successfull login
    setUserAuthentication(user) {
        console.log('from App.JS ', user);
        this.setState({ isSignInVisible: false });
        this.setState({ isRegisterVisible: false });
        this.setState({ isUserAuthenticated: true });
        this.setState({ candidate: (user.meta.firstname + ' ' + user.meta.lastname) });
        this.setState({ questionSet: user.meta.questions});
    }

    onSignUp(e) {
        // this.setState((prevState)=>({ isRegisterVisible : !prevState.isRegisterVisible }));
        this.setState({ isRegisterVisible: true });
        this.setState({ isSignInVisible: false });
        this.setState({ isQuestionVisible: false });
        this.setState({ isHomeVisible: true });

    }

    onSignIn(e) {
        // this.setState((prevState)=>({ isSignInVisible : prevState.isSignInVisible }));
        this.setState({ isSignInVisible: true });
        this.setState({ isRegisterVisible: false });
        this.setState({ isQuestionVisible: false });
        this.setState({ isHomeVisible: true });

    }

    onQuestion(e) {
        this.setState({ isSignInVisible: false });
        this.setState({ isRegisterVisible: false });
        this.setState({ isQuestionVisible: true });
        this.setState({ isHomeVisible: false });

    }

    onHome(e) {
        this.setState({ isSignInVisible: true });
        this.setState({ isRegisterVisible: false });
        this.setState({ isQuestionVisible: false });
        this.setState({ isHomeVisible: true });
    }

    render() {
        return (
            <React.Fragment>
                <MainMenu
                    onHome={this.onHome}
                    onSignin={this.onSignIn}
                    signInVisible = { !this.state.isUserAuthenticated }
                    Candidate = { this.state.candidate }
                    onSignup={this.onSignUp}
                    onQuestion={this.onQuestion} >
                </MainMenu>
                <SignIn showSignIn={this.state.isSignInVisible} setUser={this.setUserAuthentication}></SignIn>
                <SignUp showSignUp={this.state.isRegisterVisible} ></SignUp>
                <Question showQuestion={this.state.isQuestionVisible} questionSet={ this.state.questionSet }/>
                <Admin show={this.state.isAdminVisible}  />
                {/* visible={this.state.user.isAdmin} */}
            </React.Fragment>
        )
    }
}

export default hot(module)(App)