import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';
import Popup from '../popup/modal.js';

class Pin extends Component{
    constructor(props){
        super(props);

        this.state = {poppedUp: false};
        this.openPopup = this.openPopup.bind(this);
    }

    openPopup(type){
        this.setState({poppedUp: true});
        this.setState({type: type});
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
                if(that.state.type ==="editPin"){
                            return(
                                <Popup type="editPin" pin={that.props.pin} closePopup={that.closePopup.bind(that)}/>
                            )
                }
                else{
                        return(
                            <Popup type="repin" pin={that.props.pin} closePopup={that.closePopup.bind(that)}/>
                        )
                }
          
            }
        }

        return (
            <div>
                <h1>{this.props.pin.name}</h1>
                <center><img src={this.props.pin.imageURL} className="images pinImage"/></center>

                {this.props.pin.createdBy === this.props.user.username ? (
                    <div>
                        <button className="btn btn-default" onClick={this.openPopup.bind(null, "editPin")}>Edit</button>
                        <button className="btn btn-danger" onClick={this.deletePin.bind(this)}>Delete</button>
                    </div>) 
                :   <div>
                        <button className="btn btn-default"onClick={this.openPopup.bind(null, "repin")}>Pin</button>
                    </div>}

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