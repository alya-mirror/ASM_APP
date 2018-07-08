import React from 'react';
import ReactNative from 'react-native';

const {
    PureComponent,
    PropTypes
} = React;

const {
    View
} = ReactNative;

type Props = {
    inset: boolean,
    style: View.propTypes.style
}

export default class Divider extends PureComponent<Props, Props, void> {
    
    static propTypes = {
        inset: PropTypes.bool,
        style: View.propTypes.style
    };
    
    static defaultProps = {
        inset: false,
    };
    
    render () {
        const {inset, style} = this.props;
        
        return (
            <View
                style={[
                    styles.divider,
                    inset && {marginHorizontal: 72}, {
                        backgroundColor: 'rgba(0,0,0,.12)'
                    },
                    style
                ]}
            />
        );
    }
}

const styles = {
    divider: {
        height: 1
    }
};
