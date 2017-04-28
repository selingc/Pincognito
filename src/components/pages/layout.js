import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';
import NavBar from './navbar';

class Layout extends Component{
	componentWillMount(){
		this.props.fetchUser();
		this.props.fetchUserBoards(this.props.user.username);
		this.props.fetchUserPins(this.props.user.username);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.user.username != this.props.user.username){
            this.props.fetchUserBoards(nextProps.user.username);
            this.props.fetchUserPins(nextProps.user.username);
        }

	    if (nextProps.location !== this.props.location) {
	      	this.props.savePreviousPath(this.props.location);
	    }
	}

	componentWillUnmount(){
		this.props.stopFetchingUser();
		this.props.stopFetchingUserBoards(this.props.user.username);
		this.props.stopFetchingUserPins(this.props.user.username);
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

function mapStateToProps(state){
	return{
		user: state.user
	}
}

export default connect(mapStateToProps, actions)(Layout);