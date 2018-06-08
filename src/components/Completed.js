import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { Segment } from 'semantic-ui-react'

class Completed extends Component {
    constructor() {
        super()

        this.state = {
            showCompleted: false
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.state.showCompleted !== newProps.showCompleted) {
            this.setState({ showCompleted: newProps.showCompleted });
        }
    }

    render() {
        return (
            <React.Fragment>
                {/* <Advertisement unit="billboard" test="billboard"
                    className={this.state.showCompleted == true ? 'ui container' : 'hide'}>

                </Advertisement> */}

                <Segment className={this.state.showCompleted == true ? '' : 'hide'}>
                    <Segment.Group>
                        <h1>
                            You are awesome!!!
                        </h1>
                        <h3>
                            You have completed the test
                        </h3>

                        <h3>
                            Please give us feedback about your test.
                        </h3>

                    </Segment.Group>
                </Segment>


            </React.Fragment>
        )
    }
}

export default hot(module)(Completed)
