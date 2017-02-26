import React, { Component } from 'react';
import * as firebase from 'firebase';
import {browserHistory} from 'react-router';

export default class extends Component {
    constructor(props) {
        super(props);
        this.handleLogIn = this.handleLogIn.bind(this);
    }

    componentWillMount(){
        var that = this;
        this.unsubscribe = firebase.auth().onAuthStateChanged(function(user){
            if(user){
                console.log("User successfully logged in");
                browserHistory.push('/');
            }
        });
    }

    handleLogIn(e){
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.refs.email.value, this.refs.password.value).catch(function(error){
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
                    <h1>Log In</h1>
                    <hr />
                    <form onSubmit={this.handleLogIn}>
                        <div className="form-group">
                            <input type="email" placeholder="Email Address" id="email" ref="email" className="form-control" /><br />
                            <input type="password" placeholder="Password" ref="password" id="passowrd" className="form-control" /><br />
                        <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}