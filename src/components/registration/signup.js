<<<<<<< HEAD
import { bindActionCreators } from 'redux'
import React from 'react'
import { connect } from 'react-redux'
import { createUser } from '../../actions/index'
import SignupForm from '../forms/signup'

/*  Actions are passed from the function mapDispatchToProps below.
 *  data is passed in from the onSubmit handler in signupform.
 *  SignupForm is middleware, it automatically keeps track of every
 *  character change in the store -- should be useful when it comes to implementing search.
 *  actions.createUser(data) dispatches the createuser action to the data store.
 *  The last line contains a connect() function - connect takes the store (in this case null),
 *  and actions, binds them to a new react component that can be called normally.
 */

const Signup = ({actions}) => {

    const handleSubmit = (values) => {
        console.log(values);
        var data = {
            displayName: values.username,
            email: values.email,
            password: values.password
        }
        actions.createUser(data);
=======
import React, { Component } from 'react';
import * as firebase from 'firebase';
import {browserHistory, Link} from 'react-router';

export default class extends Component {
    constructor(props){
        super(props);
        this.state = {error: null};
    }

    componentWillMount(){
        const that = this;
        this.unsubscribe = firebase.auth().onAuthStateChanged(function(user){
            if(user){ //if user is not null, it means we have successfully created the user
                browserHistory.push('/');
            }
        });
    }

    handleSignUp(e){
        e.preventDefault();
        const that = this;
        if(/^\w+$/.test(this.refs.username.value)){
            firebase.database().ref("users").child(this.refs.username.value.toLowerCase()).once("value", function(snap){
                if(snap.exists()){
                    that.setState({error: "The username is already taken."});
                }else{
                    firebase.auth().createUserWithEmailAndPassword(that.refs.email.value, that.refs.password.value).then(function(user){
                        firebase.database().ref("users").child(that.refs.username.value.toLowerCase()).set({
                            email: that.refs.email.value.toLowerCase(),
                            uid: user.uid,
                            firstName: that.refs.firstName.value,
                            lastName: that.refs.lastName.value,
                            birthdate: that.refs.birthdate.value
                        });

                        user.updateProfile({
                            displayName: that.refs.username.value.toLowerCase()
                        });

                    }).catch(function(error){
                        that.setState({error: error.message});
                    });
                }
            });
        }else{
            this.setState({error: "Username can only consist of letters, numbers, and underscores"});
        }
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    render() {
        const that = this;

        function getErrors(){
            if(that.state.error){
                return <div className="alert alert-danger"><strong>Error! </strong>{that.state.error}</div>;
            }
        }
        
        return (
            <div className="children">
                {getErrors()}
                <div className="col-lg-3 col-md-3"></div>
            	<div className="signUpForm col-lg-6 col-md-6 col-sm-12 col-xs-12">
                	<h1>Sign Up</h1>
                	<hr />
                	<form onSubmit={this.handleSignUp.bind(this)}>
  						<div className="form-group">
                            <table width="100%">
                                <tbody>
                                    <tr>
                                        <td id="spaceTdLeft"><input type="text" ref="firstName" placeholder="First name" id="first_name" className="form-control" /></td>
                                        <td id="spaceTdRight"><input type="text" placeholder="Last name" ref="lastName" id="last_name" className="form-control" /></td>
                                    </tr>
                                </tbody>
                            </table><br/>
                            <input type="text" placeholder="Username" id="username" ref="username" className="form-control" /><br />
    						<input type="email" placeholder="Email Address" id="email" ref="email" className="form-control" /><br />
    						<input type="password" placeholder="Password" id="password" ref="password" className="form-control" /><br />
    						

                        	<label id="birthDate">Date of Birth</label>
                            <input type="date" id="birthDate" ref="birthdate" className="form-control" /><br />

        					<center>
                                <button className="btn btn-primary">Create Account</button><br/>
                                Have an account? <Link to="/signup">Log in!</Link>
                            </center>
    					</div>
  					</form>
  				</div>
                <div className="col-lg-3 col-md-3"></div>
            </div>
        );
>>>>>>> master
    }
    return (
        <SignupForm onSubmit={handleSubmit} />
    )
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators({ createUser }, dispatch)}
}

export default connect(null, mapDispatchToProps)(Signup);