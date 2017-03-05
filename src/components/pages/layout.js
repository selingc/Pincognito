import React, { Component } from 'react'
import {Link} from 'react-router'
import * as firebase from 'firebase'
import {connect} from 'react-redux'
import { logOff } from '../../actions/index'
import { bindActionCreators } from 'redux'


class Layout extends Component{
	constructor(props){
		super(props);
		this.handleLogOut = this.handleLogOut.bind(this);
	}

	//handles what to do when "Logout" is clicked
	handleLogOut(){
		this.props.logOff();
	}

	componentDidMount(){
		const { store } = this.context;
		this.unsubscribe = store.subscribe(() =>
			this.forceUpdate()
		);
	}

    componentWillUnmount(){
    	this.unsubscribe();
    }

    getLinks(){
  		const props = this.props;
  		const { store } = this.context;
  		const state = store.getState();

    	if(state.displayName){
  				return (
  					<ul>
						<li><Link to="/" onClick={this.handleLogOut}>Logout</Link></li>
					</ul>
  				);
  			}else{
  				return (
  					<ul>
						<li><Link to="/login">Login</Link></li>
						<li><Link to="/signup">Signup</Link></li>
						<li><Link to="/" onClick={this.handleLogOut}>Logout</Link></li>
					</ul>
  				);
  			}
    }

  	render() {

	    return (
	      	<div>
	      		{/* this is the navbar */}
				<header>
					<div className="container">
						<div className="nav-left">
							<Link to="/"><img width="55px" height="55px" src="https://firebasestorage.googleapis.com/v0/b/ideaboard-f10ef.appspot.com/o/logo.png?alt=media&token=18df34d5-0742-4464-98c5-76539c048e45"/></Link>
						</div>
						<nav className="nav-right">
							{this.getLinks()}
						</nav>
					</div>
				</header>

				{/* rest of the page - login, signup, home, etc. */}
				<div className="container">
					{this.props.children}
				</div>
	      	</div>
	    )
  	}
}
Layout.contextTypes = {
	store: React.PropTypes.object
}


function mapStateToProps(state){
    return {
        displayName: state.displayName,
        photoURL: state.photoURL
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logOff }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
//export default Layout;