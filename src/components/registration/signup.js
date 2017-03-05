import { bindActionCreators } from 'redux'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import { createUser } from '../../actions/index'
import { Field, reduxForm } from 'redux-form'
import SimpleForm from '../forms/simpleform'

class Signup extends Component {

    handleSubmit = (values) => {
    console.log(values);
    var data = {
        displayName: values.username,
        email: values.email,
        password: values.password,
        photoURL: "http://"
    }
    this.props.createUser(data);
  }
  render() {
    return (
      <SimpleForm onSubmit={this.handleSubmit} />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createUser }, dispatch)
}

export default connect(null, mapDispatchToProps)(Signup);

/*
let Signup = React.createClass({ dispatch }) => {
    let input;
    let username;
    let email;
    let password;

    function handleSignUp(e){
        e.preventDefault();
        var data = {
            displayName: this.refs.username.value,
            email: this.refs.email.value,
            password: this.refs.password.value,
            photoURL: "http://"
        }
        console.log(data);
        dispatch(createUser(data));
    }

    function handleInputChange(event) {
        const target = event.target;
    }

    return (
        <div className="children">
                <div className="signUpForm col-md-4">
                    <h1>Sign Up</h1>
                    <hr />
                    <form onSubmit={handleSignUp}>
                        <div className="form-group">
                            <input onChange={this.handleInputChange} type="username" placeholder="Username" name="username" className="form-control" /><br />
                            <input onChange={this.handleInputChange} type="email" placeholder="Email Address" name="email" className="form-control" /><br />
                            <input onChange={this.handleInputChange} type="password" placeholder="Password" name="password" className="form-control" /><br />
                        <button className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
    );
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createUser }, dispatch)
}

export default connect(null, mapDispatchToProps)(Signup);
*/