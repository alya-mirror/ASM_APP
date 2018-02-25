
import React from 'react';
import ReactNative from 'react-native';

const {
    PureComponent,
    PropTypes
} = React;

const {
    StyleSheet,
    Text,
    TouchableOpacity,
} = ReactNative;

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
    },
});

type Props = {
    children?: React.Element<*>;
    style?: any;
}

export default class AppTextButton extends PureComponent<void, Props, void> {
    static propTypes = {
        children: PropTypes.node.isRequired,
        style: Text.propTypes.style,
        onPress: PropTypes.func,
    };
    
    _root: Object;
    
    setNativeProps: Function = (nativeProps: Props): void => {
        this._root.setNativeProps(nativeProps);
    };
    
    render () {
        return (
            <TouchableOpacity
                {...this.props}
                ref={c => (this._root = c)}
                onPress={this.props.onPress}

            >
                <Text  style={[ styles.text, this.props.style ]}> {this.props.children}</Text>
            </TouchableOpacity>
        );
    }
}
