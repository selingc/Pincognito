import React, { Component } from 'react';
import * as actions from '../../actions/index.js';
import {connect} from 'react-redux';
import Popup from '../popup/modal.js';

// needs to be rewritten to avoid lifecycle methods.
// main root page (before logging in) will go here.

class Home extends Component {
	sayHello(e){
		e.preventDefault();

		this.props.sayHello();
	}

    constructor(props){
        super(props);

        this.state = {poppedUp: false};
        this.openPopup = this.openPopup.bind(this);
    }

    componentWillMount(){
        this.props.fetchPins("timestamp");
    }

    componentWillUnmount(){
        this.props.stopFetchingPins();
    }

    openPopup(pin){
        this.setState({poppedUp: true});
        this.setState({pin: pin});

    }

    closePopup(){
        this.setState({poppedUp: false});
    }

    changeFilter(e){
       
       this.props.stopFetchingPins();
       this.props.fetchPins(e.target.value);
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
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >
                <div className="input-group filter">
                    <div className="input-group-btn">
                         <h3><span className="label label-danger">Filter By</span></h3>
                    </div>
                        <select className="form-control" ref="filter" onChange={this.changeFilter.bind(this)}>
                            <option value="timestamp">Date Added</option>
                            <option value="numRepins">Most Pinned</option>
                        </select>
                </div>
                </div>

             
                {/*
                <button type="submit" onClick={this.sayHello.bind(this)}>Say Hello</button>
                <div>{this.props.hello}</div>
                */}
                <div>{this.props.pins.map((pin, index) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" key={index}>
                                <div className="panel panel-danger border" onClick={this.openPopup.bind(null, pin)}>
                                    <div className="panel-body">
                                        <center><img src={pin.imageURL} className="my-panel-content images"/></center>
                                    </div>
                                    <div className="panel-heading">{pin.name}</div>
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
		hello: state.hello,
        pins: state.pins
	}
}

export default connect(mapStateToProps, actions)(Home);