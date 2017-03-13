import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {Link} from 'react-router';

/*
 *  reduxForm middleware. looks easy to use and handles state change automatically
 *  should be very usefull when doing search since you can get each character
 *  input individually from the store.
 *  Haven't tried but I'm assuming you can add css styles to <Field>?
 *  Prop consts are used for debugging if you take a look in the redux chrome addon.
 *  Handling our dispatches to the store in a similiar fashion might be a good idea.
 */

const SignupForm = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props;

    var background = {
        backgroundImage: "url('https://cdn.pixabay.com/photo/2014/05/02/21/50/home-office-336377_960_720.jpg')",
        width: '100%',
        height: '550px',
        backgroundSize: 'cover'
    };

    return (
        <div>
        
        <section style={ background }>
      
            <div className="col-lg-3 col-md-3"></div>

            <div className="form col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <h1>Sign Up</h1>
                <hr />
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <table width="100%">
                            <tbody>
                                <tr>
                                    <td id="spaceTdLeft"><Field name="firstName" component="input" type="text" placeholder="First Name" className="form-control"/></td>
                                    <td id="spaceTdRight"><Field name="lastName" component="input" type="text" placeholder="Last Name" className="form-control" /></td>
                                </tr>
                            </tbody>
                        </table><br/>
                        <Field name="username" component="input" type="text" placeholder="Username" className="form-control" /><br />
                        <Field name="email" component="input" type="email" placeholder="Email" className="form-control" /><br />
                        <Field name="password" component="input" type="password" placeholder="Password" className="form-control" /><br />
                        
                        <label id="birthdate">Date of Birth</label>
                        <Field name="birthdate" component="input" type="date" className="form-control" /><br />

                        <center>
                            <button type="submit" className="btn btn-danger">Create Account</button><br/>
                            Have an account? <Link to="/login">Log in!</Link>
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
  form: 'signupform'  // a unique identifier for this form
})(SignupForm)