// CODE CLEANUP: this is a component get rid of any redux logic, only use presentation

import React from 'react'
import {Field, reduxForm} from 'redux-form'

const NavSearch = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props;

    return (
    	<form onSubmit={handleSubmit}>
    		<div className="input-group search_group">
	        	<Field name="search" component="input" type="text" placeholder="Search for a tag..." className="form-control search" />
	        	<span className="input-group-btn">
					<button className="btn btn-default" type="submit"><span className="glyphicon glyphicon-search"></span></button>
				</span>
			</div>
        </form>
    )
}

export default reduxForm({form: 'searchform'})(NavSearch);
