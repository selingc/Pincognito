// CODE CLEANUP: this should be a container only
// Redux logic should go here for the following components (navlogo, navsearch, navbuttons)

import {Link} from 'react-router'
import {connect} from 'react-redux'
import { logOff, fetchUser } from '../../actions/index'
import { bindActionCreators } from 'redux'
import React from 'react'
import NavSearch from './navsearch'

import { formValueSelector } from 'redux-form'
import {search} from './testactions'

import {fetchPins} from '../../actions/index.js'

/*
 *	Navbar is bound to user state from the store, and dispatched actions.
 *	if a user is logged in, he/she will have a username. This state check determins
 *	which buttons to show in the header. (signup/login or logoff)
 */

const NavBar = ({user, actions, asd}) => {

    const handleSubmit = (values) => {
    	console.log("value from form: " + values.search);
    	console.log("value from store: " + asd);
    	//dispatch action to store here with value asd
    	//make new reducer... :(
    	
//    	actions.search(values.search);
    }
	return(
		<div className="container">
		<div className="nav-left">
			<Link to="/"><img height="55px" src="https://firebasestorage.googleapis.com/v0/b/ideaboard-f10ef.appspot.com/o/pincognito_w.png?alt=media&token=9a73dc91-e40d-47c3-953b-c7c569c19918"/></Link>
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
			<nav>{asd}
				<div className="input-group">
					<span className="input-group-btn">
						<NavSearch onSubmit={handleSubmit}/>
					</span>
				</div>
			</nav>
		</div>
	)
}



const selector = formValueSelector('searchform')

function mapStateToProps(state){
	const searchvalue = selector(state, 'search')
    return {
    	user: {
    		username: state.user.username
        },
        asd: searchvalue
    }
}

function mapDispatchToProps(dispatch) {
  	return {actions: bindActionCreators({search, logOff, fetchUser, search, fetchPins}, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);