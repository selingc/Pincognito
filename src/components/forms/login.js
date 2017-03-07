import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

//  same as the signup form - more comments there

const LoginForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
        <div className="children">
                <div className="loginform col-md-4">
                    <h1>Login</h1>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <Field name="email" component="input" type="email" placeholder="Email" className="form-control" /><br />
                            <Field name="password" component="input" type="password" placeholder="Password" className="form-control" /><br />
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
            )
}

export default reduxForm({
  form: 'loginform'  // a unique identifier for this form
})(LoginForm)