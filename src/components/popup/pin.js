import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';

class Pin extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.pin.name}</h1>
                <img src={this.props.pin.imageURL} className="my-panel-content"/>
                <hr className="stylehr"/>
                <p>{this.props.pin.description}</p>
            </div>
        );
    }
}

export default Pin;

