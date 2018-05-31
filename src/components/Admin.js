import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'

class Admin extends React.Component {
    constructor() {
        super()

        this.state = {
            showAddQuestion: true,
            optionsCount: 0,
            selectedOptionId: 1
        };

        this.onAddQuestion = this.onAddQuestion.bind(this);
        this.onAddOption = this.onAddOption.bind(this);
        this.saveQuestion = this.saveQuestion.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);

    }

    onAddQuestion(e) {
        e.preventDefault();
        this.setState((prevState) => ({ showAddQuestion: !prevState.showAddQuestion }))
    }
    onAddOption(e) {
        e.preventDefault();
        if (this.state.optionsCount == 3) {
            alert('Maximum option limit reached.');
            return false
        }
        this.setState((prevState) => ({ optionsCount: (prevState.optionsCount + 1) }));
    }
    saveQuestion(e) {
        e.preventDefault();
        /*console.log(this.refs.option_1.value);
        console.log(this.refs.option_2.value);
        console.log(this.refs.option_3.value);
        console.log(this.refs.option_4.value);
        console.log(this.state.selectedOptionId);
        */

        //return false;

        fetch('/api/question/save', {
            method: "POST",
            body: JSON.stringify(
                {
                    "question": this.refs.question.value,
                    "options": [
                        this.refs.option_1.value,
                        this.refs.option_2.value,
                        this.refs.option_3.value,
                        this.refs.option_4.value
                    ],
                    "answer": this.state.selectedOptionId
                }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(
                result => {
                    console.log(result);
                }, error => {
                    console.log(error);
                }
            );
    }

    handleOptionChange(e) {
        this.setState({
            selectedOptionId: e.target.value
        })
    }

    render() {

        var options = [];
        for (var i = 0; i < this.state.optionsCount; i++) {
            options.push(i);
        }

        return (
            this.state.showAddQuestion == true
                ?
                <React.Fragment>
                    <button type="button" className={`ui basic button ${ this.props.show == false ? 'hide' : '' }`}
                    onClick={this.onAddQuestion} >
                    <i className="icon plus"></i>
                    Add new question
                    </button>

                </React.Fragment>
                :
                <React.Fragment>
                    <form>
                        <div className="row">
                            {/* <div className="six columns">
                                <label htmlFor="exampleEmailInput">Your email</label>
                                <input className="u-full-width" type="email" placeholder="test@mailbox.com" id="exampleEmailInput" />
                            </div> */}
                            <div className="six columns">
                                <label htmlFor="questionType">Question type </label>
                                <select className="u-full-width" id="questionType">
                                    <option value="1">Logical</option>
                                    <option value="2">Maths</option>
                                    <option value="3">Oops</option>
                                    <option value="4">Other</option>
                                </select>
                            </div>
                        </div>
                        <label htmlFor="question">Question</label>
                        <textarea ref="question" className="u-full-width" placeholder="Please enter your question" id="question" required></textarea>

                        <div className="row">
                            <div className="one columns">
                                <input name="answer" type="radio" value="0" defaultChecked={this.state.selectedOptionId == 0}
                                    style={{ "zoom": "2.30" }} onChange={this.handleOptionChange} />
                            </div>
                            <div className="eight columns">
                                <input ref="option_1" type="text" className="u-full-width" required />
                            </div>
                            <div className="three columns">
                                <input type="button" value="Add option" className="u-full-width" onClick={this.onAddOption} />
                            </div>
                        </div>

                        {
                            options.map((value, index) => {
                                return (
                                    <div className="row" key={index}>
                                        <div className="one columns">
                                            <input name="answer" value={(index + 1)}
                                                defaultChecked={this.state.selectedOptionId == (index + 1)} type="radio"
                                                style={{ "zoom": "2.30" }} onChange={this.handleOptionChange} />
                                        </div>
                                        <div className="eight columns">
                                            <input ref={"option_" + (index + 2)} type="text" className="u-full-width" required />
                                        </div>
                                    </div>
                                )
                            })
                        }


                        <input className="button-primary" type="submit" value="Add question" onClick={this.saveQuestion} />
                    </form>
                </React.Fragment>

        )
    }
}

export default hot(module)(Admin)