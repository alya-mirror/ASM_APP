
import React from 'react';
import {bindActionCreators} from 'redux';
import SignUp from './SignUp';
import {connect} from 'react-redux';
import {signUp} from '../../actions';

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
        signUp
    }, dispatch);
};

class SignUpContainer extends Component {
    render () {
        const {props} = this;
        return (
            <SignUp {...props}/>
        );
    }
}

export default connect(stateToProps, dispatchToProps)(SignUpContainer);
