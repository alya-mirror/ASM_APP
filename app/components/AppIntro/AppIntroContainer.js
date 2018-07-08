
import React from 'react';
import {bindActionCreators} from 'redux';
import AppIntro from './AppIntro';
import {connect} from 'react-redux';
import {logout} from '../../actions';

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
        logout
    }, dispatch);
};

class AppIntroContainer extends Component {
    render () {
        const {props} = this;
        return (
            <AppIntro {...props}/>
        );
    }
}

export default connect(stateToProps, dispatchToProps)(AppIntroContainer);
