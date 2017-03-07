import {Link} from 'react-router'
import {connect} from 'react-redux'
import { logOff } from '../../actions/index'
import { bindActionCreators } from 'redux'
import React from 'react'

/*
 *	Navbar is bound to user state from the store, and dispatched actions.
 *	if a user is logged in, he/she will have a username. This state check determins
 *	which buttons to show in the header. (signup/login or logoff)
 */

const NavBar = ({user, actions}) => (
	<div className="container">
		<div className="nav-left">
			<Link to="/"><img height="55px" src="https://firebasestorage.googleapis.com/v0/b/ideaboard-f10ef.appspot.com/o/logo_full.png?alt=media&token=0073dc3b-6b95-42e4-906b-4daef8894419"/></Link>
		</div>
			<nav className="nav-right">
				{user.displayName == null ? 
					(<ul>
						<li><Link to="/signup">Signup</Link></li>
						<li><Link to="/login">Login</Link></li>
					</ul>)
					:
					(<ul>
						<li><Link to={"/" + user.displayName}>Profile</Link></li>
						<li><Link to="/" onClick={actions.logOff}>Logout</Link></li>
					</ul>)
				}
			</nav>
		</div>
	);


function mapStateToProps(state){
	//console.log(state.user.photoURL);
    return {
    	user: {
    		displayName: state.user.displayName,
        	photoURL: state.user.photoURL
        }
    };
}

function mapDispatchToProps(dispatch) {
  	return {actions: bindActionCreators({logOff}, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);