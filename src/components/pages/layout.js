import React, { PropTypes } from 'react';
import NavBar from './navbar';

/*	this file is usually named App in other projects. 
 *	Serves as the "entrypoint" to the actual application.
 *	This file should not do any heavy lifting,
 *	it just needs to separate larger components from eachother.
 *	If we had a sliding menubar, this is where it would be imported.
 *	{children} is needed with this type of syntax, old react syntax
 *	had this.props.children in its place.
 *	Layout.propTypes isn't needed, but supposedly is good practice to
 *	use prop types.
 *	NavBar is rendered ontop of everything.
 */

const Layout = ({children}) => {
	return (
	      	<div>
	      		{/* this is the navbar */}
				<header>
					<NavBar />
				</header>

				{/* rest of the page - login, signup, home, etc. */}
				<div className="container">
					{children}
				</div>
	      	</div>
	    )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout;