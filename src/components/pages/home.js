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

    render() {
        return (
            <div className="children">
                <h1>Pinfeed</h1>
                <button type="submit" onClick={this.sayHello.bind(this)}>Say Hello</button>
                <div>{this.props.hello}</div>
            </div>
        );
    }
}

function mapStateToProps(state){
	return{
		hello: state.hello
	}
}

export default connect(mapStateToProps, actions)(Home);