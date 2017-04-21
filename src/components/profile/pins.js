import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';
import {Link} from 'react-router';
import Popup from '../popup/modal.js';

class Pins extends Component {
    constructor(props){
        super(props);

        this.state = {poppedUp: false};
        this.openPopup = this.openPopup.bind(this);
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
                if(that.state.pin){
                    return <Popup type="pin" pin={that.state.pin} closePopup={that.closePopup.bind(that)}/>
                }else{
                    return <Popup type="createPin" closePopup={that.closePopup.bind(that)}/>
                }
            }else{
                return null;
            }
        }

        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                    <Link className="create" to="/profile" onClick={this.openPopup.bind(null, null)}>
                        <div className="panel panel-default border">
                            <div className="panel-body createPanel">
                                Create New Pin
                            </div>
                        </div>
                    </Link>
                </div>

                {this.props.userPins.map((pin, index) => (
                    <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" key={index}>
                        <div className="panel panel-danger border" onClick={this.openPopup.bind(null, pin)}>
                            <div className="panel-body">
                               <center><img src={pin.imageURL} className="my-panel-content images"/></center>
                            </div>
                            <div className="panel-heading">{pin.name}</div>
                        </div>  
                    </div>
                ))}

                {getPopup()}
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        userPins: state.userPins,
        user: state.user
    }
}

export default connect(mapStateToProps, actions)(Pins)