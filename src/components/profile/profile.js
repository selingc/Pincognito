import React, { Component } from 'react';
import {connect} from 'react-redux';
import Boards from "./boards.js";
import Pins from "./pins.js";

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {boardsorpins:"boards"};
        this.changeTab = this.changeTab.bind(this);

    }
    changeTab(boardsorpins){
        this.setState({boardsorpins: boardsorpins});
    }
    render() {
        return (
            <div className="children">
                <h1>@{this.props.user.username}</h1>
                <div className="container">
                <ul className="nav nav-tabs">
                    <li className={this.state.boardsorpins==="boards"?"active":""}><a href="#boards" onClick={this.changeTab.bind(null, "boards")} data-toggle="tab">Your Boards</a></li>
                    <li className={this.state.boardsorpins==="pins"?"active":""}><a href="#pins" onClick={this.changeTab.bind(null, "pins")} data-toggle="tab">Your Pins</a></li>
                </ul>
                </div>
                <br />
                <div className="tab-content">
                    <div id="boards" className={this.state.boardsorpins==="boards"?"active tab-pane":"tab-pane"}>
                        <Boards/>
                    </div>
                    <div id="pins" className={this.state.boardsorpins==="pins"?"active tab-pane":"tab-pane"}>
                        <Pins/>
                    </div>
                </div>
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