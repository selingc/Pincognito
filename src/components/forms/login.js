import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {Link} from 'react-router';

//  same as the signup form - more comments there

const LoginForm = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props;
        
    return (
        <div>
            <div className="col-lg-3 col-md-3"></div>
            <div className="signUpForm col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <h1>Log In</h1>
                <hr />
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <Field name="email" component="input" type="text" placeholder="Username or Email Address" className="form-control" /><br />
                        <Field name="password" component="input" type="password" placeholder="Password" className="form-control" /><br />
                    <center>
                        <button className="btn btn-danger">Login</button><br/>
                        Don't have an account? <Link to="/signup">Sign up!</Link>
                    </center>
                    </div>
                </form>
            </div>
            <div className="col-lg-3 col-md-3"></div>
        </div>
    )
}

export default reduxForm({
  form: 'loginform'  // a unique identifier for this form
})(LoginForm)