import { bindActionCreators } from 'redux'
import React, { Component } from 'react'
import {connect} from 'react-redux'
//import * as actions from '../../actions/index.js';
import { createUser } from '../../actions/index'

class Signup extends Component {
    constructor(props) {
        super(props);
        this.handleSighup = this.handleSighup.bind(this);
    }

    handleSighup(e){
        e.preventDefault();
        var data = {
            displayName: this.refs.username.value,
            email: this.refs.email.value,
            password: this.refs.password.value,
            photoURL: "http://"
        }
        console.log(data);
        this.props.createUser(data);
    }

    render() {
        return (
            <div className="children">
                <div className="signUpForm col-md-4">
                    <h1>Sign Up</h1>
                    <hr />
                    <form onSubmit={this.handleSighup}>
                        <div className="form-group">
                            <input type="username" placeholder="Username" id="username" ref="username" className="form-control" /><br />
                            <input type="email" placeholder="Email Address" id="email" ref="email" className="form-control" /><br />
                            <input type="password" placeholder="Password" ref="password" id="password" className="form-control" /><br />
                        <button className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

/*function mapStateToProps(state){
    return {
        displayName: state.displayName,
        photoURL: state.photoURL
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);*/
//export default Signup;

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createUser }, dispatch)
}

export default connect(null, mapDispatchToProps)(Signup);