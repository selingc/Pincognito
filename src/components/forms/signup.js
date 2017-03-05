import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

const SignupForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
        <div className="children">
                <div className="signUpForm col-md-4">
                    <h1>Sign Up</h1>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <Field name="username" component="input" type="text" placeholder="Username" className="form-control" /><br />
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
  form: 'signupform'  // a unique identifier for this form
})(SignupForm)