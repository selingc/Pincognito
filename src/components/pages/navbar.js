import {Link} from 'react-router'
import {connect} from 'react-redux'
import { logOff, fetchUser } from '../../actions/index'
import { bindActionCreators } from 'redux'
import React from 'react'

/*
 *	Navbar is bound to user state from the store, and dispatched actions.
 *	if a user is logged in, he/she will have a username. This state check determins
 *	which buttons to show in the header. (signup/login or logoff)
 */

const NavBar = ({user, actions}) => {
	return(
		<div className="container">
		<div className="nav-left">
			<Link to="/"><img height="55px" className="nav_logo" src=""/></Link>
		</div>
			<nav className="nav-right">
				{user.username == null ? 
					(<ul id="menu">
						<li><Link to="/signup" activeClassName="active" className="activeNav">Signup</Link></li>
						<li><Link to="/login" activeClassName="active" className="activeNav">Login</Link></li>
					</ul>)
					:
					(<ul id="menu">
						
						<li><Link to="/profile" activeClassName="active" className="activeNav">Profile</Link></li>
						<li><Link to="/" onClick={actions.logOff} id="logout">Logout</Link></li>
					</ul>)
				}
			</nav>
			<nav>
				<div className="input-group">
				    <input type="text" className="form-control search" placeholder="Search"/>
				    <span className="input-group-btn">
				    	<button className="btn btn-default" type="button"><span className="glyphicon glyphicon-search"></span></button>
				    </span>
			    </div>
			</nav>
		</div>
	)
}


function mapStateToProps(state){
    return {
    	user: {
    		username: state.user.username
        }
    }
}

function mapDispatchToProps(dispatch) {
  	return {actions: bindActionCreators({logOff, fetchUser}, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);