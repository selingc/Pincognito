// CODE CLEANUP: this is a component get rid of any redux logic, only use presentation

import React from 'react'
import {Field, reduxForm} from 'redux-form'

const NavSearch = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props;

    return (
    	<form onSubmit={handleSubmit}>
        	<Field name="search" component="input" type="text" placeholder="Search" className="form-control" />
        </form>
    )
}

export default reduxForm({form: 'searchform'})(NavSearch);
