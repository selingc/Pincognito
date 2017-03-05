import * as firebase from 'firebase'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import { logOff } from '../../actions/index'
import { bindActionCreators } from 'redux'
import React from 'react'

const NavBar = ({state, actions}) => (
		<ul>
			<li><Link to="/login">Login</Link></li>
			<li><Link to="/signup">Signup</Link></li>
			<li><Link to="/" onClick={actions.logOff}>Logout</Link></li>
		</ul>
	);


function mapStateToProps(state){
    return {
    	state: {
    		displayName: state.displayName,
        	photoURL: state.photoURL
        }
    };
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators({logOff}, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);