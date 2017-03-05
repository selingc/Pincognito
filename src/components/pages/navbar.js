import * as firebase from 'firebase'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import { logOff } from '../../actions/index'
import { bindActionCreators } from 'redux'
import React from 'react'

const NavBar = ({user, actions}) => (
		<div>
		{user.displayName == null ? 
			(<ul>
			<li><Link to="/signup">Signup</Link></li>
			<li><Link to="/login">Login</Link></li>
			</ul>)
			:
			(<ul><li><Link to="/" onClick={actions.logOff}>Logout</Link></li></ul>)
		}
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