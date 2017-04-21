import { bindActionCreators } from 'redux';
import React from 'react';
import { connect } from 'react-redux';
import { createUser } from '../../actions/index';
import SignupForm from '../forms/signup';

/*  Actions are passed from the function mapDispatchToProps below.
 *  data is passed in from the onSubmit handler in signupform.
 *  SignupForm is middleware, it automatically keeps track of every
 *  character change in the store -- should be useful when it comes to implementing search.
 *  actions.createUser(data) dispatches the createuser action to the data store.
 *  The last line contains a connect() function - connect takes the store (in this case null),
 *  and actions, binds them to a new react component that can be called normally.
 */

const Signup = ({user, actions}) => {

    const handleSubmit = (values) => {
        var data = {
            firstName: values.firstName.trim(),
            lastName: values.lastName.trim(),
            username: values.username.trim(),
            email: values.email.trim(),
            password: values.password,
            birthdate: values.birthdate
        }
        actions.createUser(data);
    }

    return (
        <div className="children">
            {user.error ? (
                <div className="alert alert-danger"><strong>Error! </strong>{user.error}</div>
            ):(
                null
            )}
            <SignupForm onSubmit={handleSubmit}/>
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

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ createUser }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);