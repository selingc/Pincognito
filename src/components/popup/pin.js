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

    deletePin(){
        var confirmation = confirm("Are you sure you want to remove this pin?");
        if (confirmation) {
            this.props.deleteBoardPin(this.props.user.username, this.props.pin.boardID, this.props.pin.pinID, this.props.pin.createdBy);
            this.closePopup();
        }
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
                <h1>{this.props.pin.name}</h1>
                <center><img src={this.props.pin.imageURL} className="images pinImage"/></center>

                {this.props.pin.createdBy === this.props.user.username ? (
                    <div>
                        <button className="btn btn-default" onClick={this.openPopup.bind(this)}>Edit</button>
                        <button className="btn btn-danger" onClick={this.deletePin.bind(this)}>Delete</button>
                    </div>) 
                : null}

                <hr className="stylehr"/>
                <p className="pinDescription">{this.props.pin.description}</p>
                {getPopup()}
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