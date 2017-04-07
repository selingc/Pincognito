import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';
import Popup from '../popup/modal.js';
import {Link} from 'react-router';

class BoardPins extends Component {
    constructor(props){
        super(props);

        this.state = {poppedUp: false};
        this.openPopup = this.openPopup.bind(this);
    }

    componentWillMount() {
        this.props.fetchBoardPins(this.props.params.boardid);
    }

    componentWillUnmount() {
        this.props.stopFetchingBoardPins(this.props.params.boardid);
    }

    openPopup(pin){
        this.setState({poppedUp: true});
        this.setState({pin: pin});
        this.setState({type: "openPin"});
    }

    openEditBoardPopup(){
        this.setState({poppedUp: true});
        this.setState({type: "editBoard"});
    }

    deleteBoard(){
        var confirmation = confirm("Are you sure you want to remove this board?");
        if (confirmation) {
            this.props.deleteUserBoard(this.props.user.username, this.props.params.boardid, this.props.boardPins.pins);
        }
    }

    closePopup(){
        this.setState({poppedUp: false});
    }

    render() {
        console.log(this.props.boardPins.pins);
        var that = this;
        function getPopup(){
            if(that.state.poppedUp){
                if(that.state.type === "openPin"){
                    return (
                        <Popup type="pin" pin={that.state.pin} closePopup={that.closePopup.bind(that)}/>
                    )
                }else{
                    return (
                        <Popup type="editBoard" board={that.props.boardPins.board} closePopup={that.closePopup.bind(that)}/>
                    )
                }
            }else{
                return null;
            }
        }

        return (
            <div className="children">
                <h1><Link to={"/profile"}><span className="glyphicon glyphicon-menu-left goBack"></span></Link>{this.props.boardPins.board ? this.props.boardPins.board.name : null}</h1>
                {(this.props.boardPins.board ? this.props.boardPins.board.createdBy === this.props.user.username : false) ? (
                    <div>
                        <button className="btn btn-default" onClick={this.openEditBoardPopup.bind(this)}>Edit</button>
                        <button className="btn btn-danger" onClick={this.deleteBoard.bind(this)}>Delete</button>
                    </div>) 
                : null}
                <div> {this.props.boardPins.pins.map((pin, index) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" key={index}>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="panel panel-danger border" onClick={this.openPopup.bind(null, pin)}>
                                        <div className="panel-body">
                                            <center><img src={pin.imageURL} className="my-panel-content images"/></center>
                                        </div>
                                        <div className="panel-heading">{pin.name}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                {getPopup()}
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        boardPins: state.boardPins,
        user: state.user
    }
}

export default connect(mapStateToProps, actions)(BoardPins);