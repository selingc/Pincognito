import React, { Component } from 'react';
import * as actions from '../../actions/index.js';
import {connect} from 'react-redux';

// needs to be rewritten to avoid lifecycle methods.
// main root page (before logging in) will go here.

class Home extends Component {
    render() {
        return (
            <div className="children">
                <h1>Pinfeed</h1>
            </div>
        );
    }
}

export default Home;