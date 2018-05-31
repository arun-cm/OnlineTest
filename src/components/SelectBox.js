import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'

class SelectBox extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <label className="container">
                {
                    this.props.text
                }
                <input type="radio" name="options" />
                <span className="checkmark"></span>
            </label>
        )
    }
}
export default SelectBox;