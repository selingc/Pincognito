import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/index.js';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.handleLogIn = this.handleLogIn.bind(this);
    }

    handleLogIn(e){
        e.preventDefault();
        var data = {
            email: this.refs.email.value,
            password: this.refs.password.value
        }
        console.log(data);
        //dispatch here?

        this.props.createUser(data);
    }

    render() {
        return (
            <div className="children">
                <div className="signUpForm col-md-4">
                    <h1>Log In</h1>
                    <hr />
                    <form onSubmit={this.handleLogIn}>
                        <div className="form-group">
                            <input type="email" placeholder="Email Address" id="email" ref="email" className="form-control" /><br />
                            <input type="password" placeholder="Password" ref="password" id="password" className="form-control" /><br />
                        <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, actions)(Signup);