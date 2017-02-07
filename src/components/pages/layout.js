import React, { Component } from 'react';
import {Link} from 'react-router';

class Layout extends Component{
  	render() {
	    return (
	      	<div>
				<header>
					<div className="container">
						<div className="nav-left">
							<Link to="/">Home</Link>
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