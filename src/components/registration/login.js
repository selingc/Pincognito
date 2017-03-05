import React, { Component } from 'react';
import * as firebase from 'firebase';
import {browserHistory} from 'react-router';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {error: null};
    }

    componentWillMount(){
        var that = this;
        this.unsubscribe = firebase.auth().onAuthStateChanged(function(user){
            if(user){
                browserHistory.push('/');
            }
        });
    }

    handleLogIn(e){
        const that = this;
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.refs.email.value, this.refs.password.value).catch(function(error){
            that.setState({error: error.message});
        });

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
                    <h1>Log In</h1>
                    <hr />
                    <form onSubmit={this.handleLogIn.bind(this)}>
                        <div className="form-group">
                            <input type="email" placeholder="Email Address" id="email" ref="email" className="form-control" /><br />
                            <input type="password" placeholder="Password" ref="password" id="passowrd" className="form-control" /><br />
                        <center><button className="btn btn-primary">Login</button></center>
                        </div>
                    </form>
                </div>
                <div className="col-lg-3 col-md-3"></div>
            </div>
        );
    }
}