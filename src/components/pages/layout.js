import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';
import NavBar from './navbar';

class Layout extends Component{
	componentWillMount(){
		//this.props.fetchUser();
	}

	componentWillUnmount(){
		//this.props.stopFetchingUser();
	}

  	render(){
	    return (
	      	<div>
	      		{/* this is the navbar */}
				<header>
					<NavBar/>
				</header>

				{/* rest of the page - login, signup, home, etc. */}
				<div className="container">
					{this.props.children}
				</div>
	      	</div>
	    )
  	}
}

export default connect(null, actions)(Layout);