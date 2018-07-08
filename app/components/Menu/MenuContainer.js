
/* @flow */
import React from 'react';
import Menu from './index';
import {connect} from 'react-redux';

const {
    Component
} = React;

const stateToProps = (state) => {
    return {
        user: state.user
    };
};

class MenuContainer extends Component {
    render () {
        const {props} = this;
        return (
            <Menu {...props}/>
        );
    }
}

export default connect(stateToProps)(MenuContainer);