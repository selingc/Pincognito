import React, { Component } from 'react';
import {connect} from 'react-redux';
import Boards from "./boards.js";
import Pins from "./pins.js";

class Profile extends Component {
    render() {
        return (
            <div className="children">
                <h1>@{this.props.user.username}</h1>
                <h3>Your Boards</h3>
                <hr />
                <Boards/>
                <h3>Your Pins</h3>
                <hr />
                <Pins/>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, null)(Profile);