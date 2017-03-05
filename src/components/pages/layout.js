import React, { PropTypes } from 'react'
import NavBar from './navbar'


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