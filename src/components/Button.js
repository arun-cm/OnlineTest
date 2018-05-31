import React, {  Component } from 'react'
import ReactDOM from 'react-dom'

class Button extends Comment{
    constructor(){
        super();

        this.state = {
            clickHandler : (e)=> e.preventDefault(),
            
        };
    }

    render(){
        return(
            <React.Fragment>
                <button type="button" className="ui basic button" onClick={this.onClick} >
                    Next
                    <i className="icon angle double right"></i>
                </button>
            </React.Fragment>
        )
    }
}