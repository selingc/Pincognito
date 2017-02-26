import React, { Component } from 'react';
import * as firebase from 'firebase';
import {browserHistory} from 'react-router';

export default class extends Component {
    constructor(props) {
        super(props);
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    componentWillMount(){
        var that = this;
        this.unsubscribe = firebase.auth().onAuthStateChanged(function(user){
            if(user){
                console.log("User successfully signed up");
                var userData = {
                    email: that.refs.email.value,
                    username: that.refs.username.value,
                    firstName: that.refs.firstName.value,
                    lastName: that.refs.lastName.value,
                    birthdate: that.refs.birthdate.value
                }

                firebase.database().ref("users").child(user.uid).set(userData);
                browserHistory.push('/');
            }
        });
    }

    handleSignUp(e){
        e.preventDefault();
        firebase.database().ref('users').on("child_added", function(snap){

        });

        firebase.auth().createUserWithEmailAndPassword(this.refs.email.value, this.refs.password.value).catch(function(error){
            console.log(error.code);
            console.log(error.message);
        });

    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    render() {
        return (
            <div className="children">
            	<div className="signUpForm col-md-4">
                	<h1>Sign Up</h1>
                	<hr />
                	<form onSubmit={this.handleSignUp}>
  						<div className="form-group">
    						<input type="email" placeholder="Email Address" id="email" ref="email" className="form-control" /><br />
    						<input type="password" placeholder="Password" id="password" ref="password" className="form-control" /><br />
    						<input type="text" placeholder="Username" id="username" ref="username" className="form-control" /><br />
    						<table>
                                <tbody>
        							<tr>
        								<td id="spaceTd"><input type="text" ref="firstName" placeholder="First name" id="first_name" className="form-control" /><br /></td>
        								<td><input type="text" placeholder="Last name" ref="lastName" id="last_name" className="form-control" /><br /></td>
        							</tr>
                                </tbody>
    						</table>

                    	<label id="birthDate">Date of Birth</label>
                        <input type="date" id="birthDate" ref="birthdate" className="form-control" /><br />

    					<button className="btn btn-primary">Create Account</button>
    					</div>
  					</form>
  				</div>
            </div>
        );
    }
}