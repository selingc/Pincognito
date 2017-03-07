import React, { Component } from 'react';
import * as firebase from 'firebase';
import Boards from "./boards.js";
import Pins from "./pins.js";

export default class extends Component {
    constructor(props){
        super(props);

        this.state = {name: null}
    }

    componentWillMount(){
        const that = this;

        firebase.database().ref("users").child(this.props.params.username).once("value", function(snap){
            that.setState({name: snap.val().firstName + " " + snap.val().lastName});
        });
    }

    render() {
        return (
            <div className="children">
                <h1>{this.state.name}</h1>
                <h3>Your Boards</h3>
                <Boards username={this.props.params.username}/>
                <h3>Your Pins</h3>
                <Boards username={this.props.params.username}/>
            </div>
        );
    }
}