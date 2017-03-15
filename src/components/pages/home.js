import React, { Component } from 'react';
import * as actions from '../../actions/index.js';
import {connect} from 'react-redux';

// needs to be rewritten to avoid lifecycle methods.
// main root page (before logging in) will go here.

class Home extends Component {
	sayHello(e){
		e.preventDefault();

		this.props.sayHello();
	}

    componentWillMount(){
        this.props.fetchPins();
    }

    componentWillUnmount(){
        this.props.stopFetchingPins();
    }

    render() {
        return (
            <div className="children">
                <h1>Pinfeed</h1>
                <button type="submit" onClick={this.sayHello.bind(this)}>Say Hello</button>
                <div>{this.props.hello}</div>

                <div>{this.props.pins.map((pin, index) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" key={index}>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="panel panel-danger">
                                        <div className="panel-heading">{pin.name}</div>
                                        <div className="panel-body">
                                            <center><img src={pin.imageURL} className="my-panel-content"/></center>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

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