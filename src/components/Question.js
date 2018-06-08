import React from 'react'
import { hot } from 'react-hot-loader'
import SelectBox from './SelectBox'
import { Segment } from 'semantic-ui-react'
import Instructions from './Instructions'
import Completed from './Completed'

class Question extends React.Component {
    constructor() {
        super()

        this.state = {
            nextIndex: 0,
            question: {
                question: "",
                options: []
            },
            questionSet: [],

            showQuestion: false,

            showInstructions: true,

            completed: false
        };

        this.onClick = this.onClick.bind(this);
        this.initQuestion = this.initQuestion.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.questionSet !== this.state.questionSet) {
            this.setState({ questionSet: newProps.questionSet });
        }

        if (newProps.showQuestion !== this.state.showQuestion) {
            this.setState({ showQuestion: newProps.showQuestion });

            // can change code to single line.
            //this.setState({ showInstructions: !newProps.showQuestion });
            
        }

        if (this.state.showQuestion == false) {
            this.setState({ showInstructions: true });
        } else {
            this.setState({ showInstructions: false });
        }

    }

    initQuestion(e) {
        if (this.state.questionSet.length > 0) {
            this.setState({ showQuestion: true });
            this.setState({ showInstructions: false });

            fetch('/api/question?qno=' + this.state.questionSet[this.state.nextIndex])
                .then(res => res.json())
                .then(
                    result => {
                        this.setState({ question: result });
                        this.setState((prevState) => ({ nextIndex: (prevState.nextIndex + 1) }))
                    }, error => {
                        console.log(error);
                    }
                );
        }
    }

    onClick(e) {

        if (this.state.questionSet.length > this.state.nextIndex) {


            console.log(' next index : ', this.state.nextIndex);
            console.log(' question set : ', this.state.questionSet);

            fetch('/api/question?qno=' + this.state.questionSet[this.state.nextIndex])
                .then((res) => {

                    // so this is resolve or reject becsue IT IS Promise and .json() return a promise 
                    let body = res.json();
                    // body stream already read.
                    //console.log(' before converting to json : ', body);
                    return body;
                })
                .then(
                    result => {
                        this.setState({ question: result });
                        this.setState((prevState) => ({ nextIndex: (prevState.nextIndex + 1) }));

                    }, error => {
                        console.log(error);
                        this.setState((prevState) => ({ nextIndex: (prevState.nextIndex + 1) }));
                    }
                );
        }
        else {
            alert('completed');

            this.setState({ completed: true });
            this.setState({ showQuestion: false });
            this.setState({ showInstructions: false });
        }
    }

    render() {
        return (
            <React.Fragment>

                <Instructions showInstructions={this.state.showInstructions} StartQuestion={this.initQuestion}>

                </Instructions>

                <Segment stacked className={`custom-stacked ${this.state.showQuestion == false ? 'hide' : ''}`}>
                    <div className={`ui container ${this.state.showQuestion == false ? 'hide' : ''}`} >
                        <h1>{this.state.question.question}</h1>
                        <Segment.Group>
                            {
                                this.state.question.options.map((opt, i) =>
                                    <Segment key={i}>
                                        <SelectBox id={'option' + i} text={opt} />
                                    </Segment>
                                )
                            }
                        </Segment.Group>
                        <button type="button" className="ui basic button" onClick={this.onClick} >
                            Next
                    <i className="icon angle double right"></i>
                        </button>
                    </div>
                </Segment>

                <Completed showCompleted={ this.state.completed }>

                </Completed>


            </React.Fragment>
        );
    }
}

export default hot(module)(Question);
