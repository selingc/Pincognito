import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';
import Popup from '../popup/modal.js';

class Pin extends Component{
    constructor(props){
        super(props);

        this.state = {poppedUp: false};
    }

    openPopup(pin, type){
        this.setState({poppedUp: true});
    }

    closePopup(){
        this.setState({poppedUp: false});
        this.props.closePopup();
    }

    render() {
        var that = this;
        function getPopup(){
            if(that.state.poppedUp){
                return(
                    <Popup type="editPin" pin={that.props.pin} closePopup={that.closePopup.bind(that)}/>
                )
            }
        }

        return (
            <div>
            <div className="hoverContainer">
                <h1>{this.props.pin.name}</h1>
                <center><img src={this.props.pin.imageURL} className="images pinImage"/></center>

                <div className="overlay">
                    {this.props.pin.createdBy === this.props.user.username ? (
                    <div>
                        <button className="btn btn-default buttonHover" onClick={this.openPopup.bind(this)}><span className="glyphicon glyphicon-pencil"></span></button>
                    </div>) 
                : null}
                </div>

                

                <hr className="stylehr"/>
                <p className="pinDescription">{this.props.pin.description}</p>
                {getPopup()}
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

export default connect(mapStateToProps, actions)(Pin);