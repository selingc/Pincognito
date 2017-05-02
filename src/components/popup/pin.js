import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';
import Popup from '../popup/modal.js';
import {browserHistory} from 'react-router'; 

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

    unpinFromBoard(){
        this.props.unpinFromBoard(this.props.user.username, this.props.pin.pinID);
        this.closePopup();
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

        function checkIfPinned(){
            for(var i = 0; i < that.props.userPins.length; i++){
                if ( that.props.userPins[i].pinID === that.props.pin.pinID){
                    return true; 
                }
            }
            return false; 
        }

        var tags = this.props.pin.tags.split(",");

        return (
            <div>
            <div className="hoverContainer">
                <h2>
                    <span className="pinTitle">{this.props.pin.name}</span>
                    <span className="num_repin">
                        {this.props.user.username ? (<span>

                        {this.props.pin.createdBy === this.props.user.username ? (
                            <span>
                                <span className="glyphicon glyphicon-pencil edit" onClick={this.openPopup.bind(null, "editPin")}></span>
                            </span>) 
                        :   <span>
                                {checkIfPinned() ? 
                                    <span className="glyphicon glyphicon-pushpin pinned" onClick={this.unpinFromBoard.bind(this)}>{this.props.pin.numRepins ? this.props.pin.numRepins : 0}</span>
                                : 
                                    <span className="glyphicon glyphicon-pushpin notpinned" onClick={this.openPopup.bind(null, "repin")}>{this.props.pin.numRepins ? this.props.pin.numRepins : 0}</span>
                                }
                                
                            </span>

                        }</span>)
                    :null 

                    } 
                    </span>
                </h2>
                <center><img src={this.props.pin.imageURL} className="images pinImage"/></center>

                <div className="pinDescription">{this.props.pin.description}</div>

                <h5>{tags.map((tag, index) =>(
                    <span key={index} className="label label-danger">{tag.trim()}</span>
                ))}</h5>
                {getPopup()}
            </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        user: state.user,
        userPins: state.userPins
    }
}

export default connect(mapStateToProps, actions)(Pin);