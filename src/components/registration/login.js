import React, { Component } from 'react';
import * as firebase from 'firebase';
import {browserHistory, Link} from 'react-router';

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
        if(this.refs.email.value.includes("@")){
            firebase.auth().signInWithEmailAndPassword(this.refs.email.value, this.refs.password.value).catch(function(error){
                that.setState({error: error.message});
            });
        }else{
            firebase.database().ref("users").child(this.refs.email.value.toLowerCase()).once("value", function(snap){
                if(snap.exists()){
                    firebase.auth().signInWithEmailAndPassword(snap.val().email, that.refs.password.value).catch(function(error){
                        that.setState({error: error.message});
                    });
                }else{
                    that.setState({error: "Username does not exist."});
                }
            });
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
                    <h1>Log In</h1>
                    <hr />
                    <form onSubmit={this.handleLogIn.bind(this)}>
                        <div className="form-group">
                            <input type="text" placeholder="Username or Email Address" id="email" ref="email" className="form-control" /><br />
                            <input type="password" placeholder="Password" ref="password" id="passowrd" className="form-control" /><br />
                        <center>
                            <button className="btn btn-primary">Login</button><br/>
                            Don't have an account? <Link to="/signup">Sign up!</Link>
                        </center>
                        </div>
                    </form>
                </div>
                <div className="col-lg-3 col-md-3"></div>
            </div>
        );
    }
}