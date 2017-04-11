import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {Link} from 'react-router';

//  same as the signup form - more comments there

const ForgetPasswordForm = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props;
        
    var background = {
        backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/ideaboard-f10ef.appspot.com/o/login.jpg?alt=media&token=7de78808-bbc6-4f8b-b738-5ff0dcc61bcb')",
        width: '100%',
        height: '550px',
        backgroundSize: 'cover'
    };

    return (
        <div>

        <section style={ background }>

            <div className="col-lg-3 col-md-3"></div>

            <div className="form col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <h1>Forgot Password?</h1>
                <hr className="stylehr"/>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <Field name="email" component="input" type="text" placeholder="Username or Email Address" className="form-control" /><br />
                        
                    <center>
                        <button className="btn btn-danger">send email</button><br/>
                        Don't have an account? <Link to="/signup">Sign up!</Link>
                    </center>
                    </div>
                </form>
            </div>

            <div className="col-lg-3 col-md-3"></div>

        </section>

        </div>
    )
}

export default reduxForm({
  form: 'ForgetPasswordForm'  // a unique identifier for this form
})(ForgetPasswordForm)