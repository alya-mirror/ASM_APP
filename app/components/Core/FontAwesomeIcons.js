import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const {Component} = React;

export default class Ionicon extends Component {
    setNativeProps (nativeProps) {
        this._root.setNativeProps(nativeProps);
    }
    
    render () {
        return (<FontAwesome {...this.props}
                ref={c => (this._root = c)}
            />
        );
    }
}

