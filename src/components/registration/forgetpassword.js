import { bindActionCreators } from 'redux';
import React from 'react';
import { connect } from 'react-redux';
import { forgetPassword } from '../../actions/index';
import ForgetPasswordForm from '../forms/forgetpassword';

// basically the same as signup.js - more comments are in that file

const ForgetPassword = ({user, actions}) => {

    const handleSubmit = (values) => {
        var data = {
            email: values.email.trim()
            
        }

        console.log(data);
        actions.forgetPassword(data);
    }

    return (
        <div className="children">
            <ForgetPasswordForm onSubmit={handleSubmit}/>
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
    return {actions: bindActionCreators({ forgetPassword }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);