import React, { Component } from 'react'
import { hot } from 'react-hot-loader';

class CountDownTimer extends Component {
    constructor(props) {
        super(props);

        // second start value
        let sec = this.props.second || 0;

        // minute start value
        let min = this.props.minute || 0;
        
        // hour start value
        let hour = this.props.hour || 0
        
        // direction up or down
        let dir = this.props.direction == "down" ? -1 : 1 ; 

        setInterval(() => {

            // this.refs.divider1.style.display = "block";
            // this.refs.divider2.style.display = "block";

            // if sec-2 equals 9
            if (this.refs.sec2.innerHTML == 9) {
                // make sec to 0
                sec = 0;

                // increase sec1 + 1
                this.refs.sec1.innerHTML = parseInt(this.refs.sec1.innerHTML) + 1;
                
                // if sec-1 equals 6
                if( this.refs.sec1.innerHTML == 6 ){
                    // set all sec's to 0 
                    this.refs.sec1.innerHTML = 0;
                    this.refs.sec2.innerHTML = 0;
                    // increase min2 + 1
                    this.refs.min2.innerHTML = parseInt(this.refs.min2.innerHTML) + 1;
                    // if min-2 equals 9
                    if(this.refs.min2.innerHTML == 9) {
                        // if min-1 equals to 5
                        if( this.refs.min1.innerHTML == 5 ){
                            // set both min's to 0
                            this.refs.min2.innerHTML = 0;
                            this.refs.min1.innerHTML = 0;
                            // increase hour2 + 1
                            this.refs.hour2.innerHTML = parseInt(this.refs.hour2.innerHTML) + 1;
                        }

                        this.refs.min2.innerHTML = 0;
                        this.refs.min1.innerHTML = parseInt(this.refs.min1.innerHTML) + 1;
                    }
    
                }
            }

            this.refs.sec2.innerHTML = sec;
            sec++;


            // this.refs.divider1.style.display = "none";
            // this.refs.divider2.style.display = "none";
        }, 1000);

    }

    render() {
        return (
            <React.Fragment>

                <div className="timer">
                    <div className="hours-box">
                        <div className="">
                            <span ref='hour1' className="top">0</span>
                        </div>
                        <div className="">
                            <span ref='hour2' className="bottom">0</span>
                        </div>
                    </div>
                    <div className="divider" ref="divider1">
                        <span className="top dot"></span>
                        <span className="bottom dot"></span>
                    </div>
                    <div className="minutes-box">
                        <div className="">
                            <span ref='min1' className="top">0</span>
                        </div>
                        <div className="">
                            <span ref='min2' className="bottom">0</span>
                        </div>
                    </div>
                    <div className="divider" ref="divider2">
                        <span className="top dot"></span>
                        <span className="bottom dot"></span>
                    </div>
                    <div className="seconds-box">
                        <div className="">
                            <span ref='sec1' className="top">0</span>
                        </div>
                        <div className="">
                            <span ref='sec2' className="bottom">0</span>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default hot(module)(CountDownTimer)