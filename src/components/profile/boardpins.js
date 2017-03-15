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
    }

    closePopup(){
        this.setState({poppedUp: false});
    }

    render() {
        var that = this;
        function getPopup(){
            if(that.state.poppedUp){
                return (
                    <Popup type="pin" pin={that.state.pin} closePopup={that.closePopup.bind(that)}/>
                )
            }else{
                return null;
            }
        }

        return (
            <div className="children">
                <h1><Link to={"/" + this.props.user.username}><span className="glyphicon glyphicon-menu-left goBack"></span></Link>{this.props.boardPins.name}</h1>
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
        boardPins: {
            name: state.boardPins.name,
            pins: state.boardPins.pins
        },

        user: {
            username: state.user.username
        }
    }
}

export default connect(mapStateToProps, actions)(BoardPins);

