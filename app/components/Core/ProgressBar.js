

import React from 'react';
import ReactNative from 'react-native';

const {
    PureComponent,
    PropTypes
} = React;

const {
    ActivityIndicator,
} = ReactNative;

type Props = {
    color?: string;
    size?: 'small' | 'large';
    style?: any;
}

export default class ProgressBar extends PureComponent<void, Props, void> {
    static propTypes = {
        color: PropTypes.string,
        size: ActivityIndicator.propTypes.size,
        style: ActivityIndicator.propTypes.style,
    };
    
    setNativeProps (nativeProps:any) {
        this._root.setNativeProps(nativeProps);
    }
    
    _root:Object;
    
    render () {
        return (
            <ActivityIndicator
                color={this.props.color}
                ref={c => (this._root = c)}
                size={this.props.size}
                style={this.props.style}
            />
        );
    }
}
