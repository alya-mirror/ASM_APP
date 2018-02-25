
import React from 'react';
import {bindActionCreators} from 'redux';
import Login from './Login';
import {connect} from 'react-redux';
import {login} from '../../actions';

const {
    Component
} = React;

const stateToProps = (state) => {
    return {
        account: state.account
    };
};

const dispatchToProps = (dispatch) => {
    return bindActionCreators({
        login
    }, dispatch);
};

class LoginContainer extends Component {
    render () {
        const {props} = this;
        return (
            <Login {...props}/>
        );
    }
}

export default connect(stateToProps, dispatchToProps)(LoginContainer);
