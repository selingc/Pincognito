import React, { Component } from 'react';
import * as actions from '../../actions/index.js';
import {connect} from 'react-redux';
import Popup from '../popup/modal.js';

import { formValueSelector } from 'redux-form'

const Home2 = ({asd}) => {
    return (
        <div>
            <br /><br /><br /><br /><br /><br />
            {asd}
        </div>
    )
}


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
                <div className="row">
                    <div className="col-lg-3 col-md-4" >
                        <div className="input-group filter">
                            <div className="input-group-btn">
                                 <h4><span className="text">Filter By: </span></h4>
                            </div>
                                <select className="form-control filter panel panel-danger" ref="filter" onChange={this.changeFilter.bind(this)}>
                                    <option value="timestamp">Date Added</option>
                                    <option value="numRepins">Most Pinned</option>
                                </select>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-8"></div>
                </div>

                <hr className="stylehr"/>

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



const selector = formValueSelector('searchform')

function mapStateToProps(state){
    const searchvalue = selector(state, 'search')
	return{
        pins: state.pins,
        asd: searchvalue
	}
}

export default connect(mapStateToProps, actions)(Home);