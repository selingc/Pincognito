import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

/*
 *  reduxForm middleware. looks easy to use and handles state change automatically
 *  should be very usefull when doing search since you can get each character
 *  input individually from the store.
 *  Haven't tried but I'm assuming you can add css styles to <Field>?
 *  Prop consts are used for debugging if you take a look in the redux chrome addon.
 *  Handling our dispatches to the store in a similiar fashion might be a good idea.
 */

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