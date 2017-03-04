import React, { Component } from 'react';
import {Link} from 'react-router';
import * as firebase from 'firebase';

class Layout extends Component{
	constructor(props){
		super(props);
        this.state = {};

		//must be done for added functions other than the normal React.JS functions
		this.handleLogOut = this.handleLogOut.bind(this);
	}

	//handles what to do when "Logout" is clicked
	handleLogOut(){
		//firebase.auth().signOut();
		//dispatch logout req here
	}

  	render() {
  		var that = this;

  		function getLinks(){
  			if(that.state.isLoggedIn){
  				return (
  					<ul>
						<li><Link to="/" onClick={that.handleLogOut}>Logout</Link></li>
					</ul>
  				);
  			}else{
  				return (
  					<ul>
						<li><Link to="/login">Login</Link></li>
						<li><Link to="/signup">Signup</Link></li>
					</ul>
  				);
  			}
  		}

	    return (
	      	<div>
	      		{/* this is the navbar */}
				<header>
					<div className="container">
						<div className="nav-left">
							<Link to="/"><img width="55px" height="55px" src="https://firebasestorage.googleapis.com/v0/b/ideaboard-f10ef.appspot.com/o/logo.png?alt=media&token=18df34d5-0742-4464-98c5-76539c048e45"/></Link>
						</div>
						<nav className="nav-right">
							{getLinks()}
						</nav>
					</div>
				</header>

				{/* rest of the page - login, signup, home, etc. */}
				<div className="container">
					{this.props.children}
				</div>
	      	</div>
	    )
  	}
}

export default Layout;