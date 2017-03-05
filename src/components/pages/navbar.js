import {Link} from 'react-router'
import {connect} from 'react-redux'
import { logOff } from '../../actions/index'
import { bindActionCreators } from 'redux'
import React from 'react'

const NavBar = ({user, actions}) => (
	<div className="container">
		<div className="nav-left">
			<Link to="/"><img width="55px" height="55px" src="https://firebasestorage.googleapis.com/v0/b/ideaboard-f10ef.appspot.com/o/logo.png?alt=media&token=18df34d5-0742-4464-98c5-76539c048e45"/></Link>
		</div>
			<nav className="nav-right">
				{user.displayName == null ? 
					(<ul>
						<li><Link to="/signup">Signup</Link></li>
						<li><Link to="/login">Login</Link></li>
					</ul>)
					:
					(<ul>
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