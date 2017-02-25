import React, { Component } from 'react';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    handleSignUp(e){
        e.preventDefault();
        
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
    						<input type="password" placeholder="Password" id="passowrd" className="form-control" /><br />
    						<input type="text" placeholder="Username" id="username" className="form-control" /><br />
    						<table>
                                <tbody>
        							<tr>
        								<td id="spaceTd"><input type="text" placeholder="First name" id="first_name" className="form-control" /><br /></td>
        								<td><input type="text" placeholder="Last name" id="last_name" className="form-control" /><br /></td>
        							</tr>
                                </tbody>
    						</table>

                    	<label id="birthDate">Date of Birth</label>
                        <input type="date" id="birthDate" className="form-control" /><br />

    					<button className="btn btn-primary">Create Account</button>
    					</div>
  					</form>
  				</div>
            </div>
        );
    }
}