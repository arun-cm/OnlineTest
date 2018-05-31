import React from 'react'
import { hot } from 'react-hot-loader'
import SelectBox from './SelectBox'
import { Segment } from 'semantic-ui-react'

class Question extends React.Component {
    constructor() {
        super()

        this.state = {
            nextIndex: 0,
            question: {
                question: "",
                options: []
            },
            questionSet: []
        };

        this.onClick = this.onClick.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.questionSet != this.state.questionSet) {
            this.setState({ questionSet: newProps.questionSet });
        }
    }

    componentDidMount() {
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

    onClick(e) {

        console.log(this.state.nextIndex);
        console.log(this.state.questionSet[this.state.nextIndex]);

        fetch('/api/question?qno=' + this.state.questionSet[this.state.nextIndex])
            .then( (res) => {

                    // so this is resolve or reject becsue IT IS Promise and .json() return a promise 
                    let body = res.json();
                    // body stream already read.
                    console.log(' before converting to json : ', body);
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

    render() {
        return (
            <React.Fragment>
                <Segment stacked className="custom-stacked">
                    <div className={`ui container ${this.props.showQuestion == false ? 'hide' : ''}`} >
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
            </React.Fragment>
        );
    }
}

export default hot(module)(Question);
