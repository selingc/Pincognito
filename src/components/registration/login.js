import { bindActionCreators } from 'redux';
import React from 'react';
import { connect } from 'react-redux';
import { logIn } from '../../actions/index';
import LoginForm from '../forms/login';

// basically the same as signup.js - more comments are in that file

const Login = ({user, actions}) => {

    const handleSubmit = (values) => {
        var data = {
            email: values.email,
            password: values.password
        }

        actions.logIn(data);
    }

    return (
        <div className="children">
            {user.error ? (
                <div className="alert alert-danger"><strong>Error! </strong>{user.error}</div>
            ):(
                null
            )}
            <LoginForm onSubmit={handleSubmit} error={user.error}/>
        </div>
    )
}

function mapStateToProps(state){
    return{
        user: {
            error: state.user.error
        }
    }
}

function mapDispatchToProps(dispatch){
    return {actions: bindActionCreators({ logIn }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);