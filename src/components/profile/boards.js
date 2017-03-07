import React, { Component } from 'react';
import * as firebase from 'firebase';

export default class extends Component {
    constructor(props){
        super(props);

        this.state = {boards: []};
    }

    componentWillMount(){
        const that = this;

        firebase.database().ref("user-boards").child(this.props.username).on("child_added", function(snap){
            that.setState({boards: this.state.boards.concat(snap.val())});
        });
    }

    render() {
        return (
            <div>
                Show my boards
            </div>
        );
    }
}