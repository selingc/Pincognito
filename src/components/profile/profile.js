import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';
import Boards from "./boards.js";
import Pins from "./pins.js";

class Profile extends Component {
    componentWillMount(){
        this.props.fetchUserBoards(this.props.params.username);
    }

    componentWillUnmount(){
        this.props.stopFetchingUserBoards(this.props.params.username);
    }

    render() {
        return (
            <div className="children">
                <h1>@{this.props.params.username}</h1>
                <h3>Your Boards</h3>
                <hr />
                <Boards username={this.props.params.username}/>
                <h3>Your Pins</h3>
                <hr />
                <Pins username={this.props.params.username}/>
            </div>
        );
    }
}

export default connect(null, actions)(Profile);