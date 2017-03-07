import React, { Component } from 'react';
import * as firebase from 'firebase';

export default class extends Component {
    constructor(props){
        super(props);

        this.state = {pins: []};
    }

    componentWillMount(){
        const that = this;

        firebase.database().ref("user-pins").child(this.props.username).on("child_added", function(snap){
            that.setState({pins: this.state.pins.concat(snap.val())});
        });
    }

    render() {
        return (
            <div>
                Show my pins
            </div>
        );
    }
}