
import React from 'react';
import ReactNative from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const {
    PureComponent
} = React;

const {
    Text,
} = ReactNative;

type Props = {
    style?: any;
}

export default class MaterialIcon extends PureComponent<void, Props, void> {
    static propTypes = {
        style: Text.propTypes.style
    };
    
    setNativeProps (nativeProps: Props) {
        this._root.setNativeProps(nativeProps);
    }
    
    _root: Object;
    
    render () {
        const {props} = this;
        return (
            <EvilIcons
                allowFontScaling={false}
                ref={c => (this._root = c)}
                {...props}
            />
        );
    }
}

