import { bindActionCreators } from 'redux'
import React from 'react'
import { connect } from 'react-redux'
import { logIn } from '../../actions/index'
import LoginForm from '../forms/login'

// basically the same as signup.js - more comments are in that file

const Login = ({actions}) => {

    const handleSubmit = (values) => {
        console.log(values);
        var data = {
            email: values.email,
            password: values.password
        }
        actions.logIn(data);
    }
    return (
        <LoginForm onSubmit={handleSubmit} />
    )
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators({ logIn }, dispatch)}
}

export default connect(null, mapDispatchToProps)(Login);