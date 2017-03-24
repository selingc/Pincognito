import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';

class Pin extends Component{
    render() {
        var that = this;

        function getTags(){
            if(that.props.pin.tags){
                var tagKeys = Object.keys(that.props.pin.tags);
                var tags = "";
                for(var i=0; i<tagKeys.length; i++){
                    tags += tagKeys[i];
                    if(i < tagKeys.length - 1){
                        tags += ", ";
                    }
                }
                return tags;
            }
        }

        return (
            <div>
                <h1>{this.props.pin.name}</h1>
                <center><img src={this.props.pin.imageURL} className="images pinImage"/></center>
                <hr className="stylehr"/>
                <p className="pinDescription">{this.props.pin.description}</p>
                <p>
                    {getTags()}
                </p>
            </div>
        );
    }
}

export default Pin;