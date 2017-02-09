import React, { Component } from 'react';
import {Link} from 'react-router';

class Layout extends Component{
  	render() {
	    return (
	      	<div>
				<header>
					<div className="container">
						<div className="nav-left">
							<Link to="/"><img width="55px" height="55px" src="https://firebasestorage.googleapis.com/v0/b/ideaboard-f10ef.appspot.com/o/logo.png?alt=media&token=18df34d5-0742-4464-98c5-76539c048e45"/></Link>
						</div>
						<nav className="nav-right">
							<ul>
								<li><Link to="/login">Login</Link></li>
								<li><Link to="/signup">Signup</Link></li>
							</ul>
						</nav>
					</div>
				</header>

				<div className="container">
					{this.props.children}
				</div>
	      	</div>
	    )
  	}
}

export default Layout;