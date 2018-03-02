
import React from 'react';
import {bindActionCreators} from 'redux';
import CheckFaceTraining from './CheckFaceTraining';
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

class TrainContainer extends Component {
    render () {
        const {props} = this;
        return (
            <CheckFaceTraining {...props}/>
        );
    }
}

export default connect(stateToProps, dispatchToProps)(TrainContainer);
