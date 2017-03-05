import { bindActionCreators } from 'redux'
import React from 'react'
import {connect} from 'react-redux'
import { createUser } from '../../actions/index'
import SignupForm from '../forms/signup'

const Signup = ({actions}) => {

    const handleSubmit = (values) => {
        console.log(values);
        var data = {
            displayName: values.username,
            email: values.email,
            password: values.password
        }
        actions.createUser(data);
    }
    return (
        <SignupForm onSubmit={handleSubmit} />
    )
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators({ createUser }, dispatch)}
}

export default connect(null, mapDispatchToProps)(Signup);