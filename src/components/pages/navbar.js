// CODE CLEANUP: this should be a container only
// Redux logic should go here for the following components (navlogo, navsearch, navbuttons)

import {Link, browserHistory} from 'react-router'
import {connect} from 'react-redux'
import { logOff, search, resetSearch } from '../../actions/index'
import { bindActionCreators } from 'redux'
import React from 'react'
import NavSearch from './navsearch'

/*
 *	Navbar is bound to user state from the store, and dispatched actions.
 *	if a user is logged in, he/she will have a username. This state check determins
 *	which buttons to show in the header. (signup/login or logoff)
 */

const NavBar = ({user, actions, search}) => {
    const handleSubmit = (values) => {
    	browserHistory.push("/search?q="+values.search);
    }
	return(
		<div className="container mobile">
			<div className="nav-left">
				<Link to="/"><img height="55px" className="nav_logo" src=""/></Link>
			</div>
			<nav className="nav-right">
				{user.username == null ? 
					(<ul id="menu">
						<li><Link to="/signup" activeClassName="active" className="activeNav"><span className="menu_profile_text">Signup</span></Link></li>
						<li><Link to="/login" activeClassName="active" className="activeNav"><span className="glyphicon glyphicon-log-in menu_logout_icon"></span><span className="menu_logout_text">Login</span></Link></li>
					</ul>)
					:
					(<ul id="menu">	
						<li><Link to="/profile" activeClassName="active" className="activeNav "><span className="glyphicon glyphicon-user menu_profile_icon"></span><span className="menu_profile_text">Profile</span></Link></li>
						<li><Link to="/" onClick={actions.logOff} id="logout"><span className="glyphicon glyphicon-log-out menu_logout_icon"></span><span className="menu_logout_text">Logout</span></Link></li>
					</ul>)
				}
			</nav>

			<nav>
				<NavSearch onSubmit={handleSubmit}/>
			</nav>
		</div>
	)
}


function mapStateToProps(state){
    return {
    	user: {
    		username: state.user.username
        },
        searchResults: state.searchResults
    }
}

function mapDispatchToProps(dispatch) {
  	return {actions: bindActionCreators({logOff, search, resetSearch}, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);