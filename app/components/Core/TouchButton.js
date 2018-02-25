import React from 'react';
import ReactNative from 'react-native';

const {
    PureComponent,
    PropTypes
} = React;

const {
    TouchableNativeFeedback,
    TouchableOpacity,
    Platform,
    View
} = ReactNative;

const LOLLIPOP = 21;

type Props = {
    delayPressIn: number;
    pressColor: string;
    borderless?: boolean;
    children?: React.Element<any>;
    style?: any;
}

type DefaultProps = {
    delayPressIn: number;
    pressColor: string;
}

export default class TouchableItem extends PureComponent<DefaultProps, Props, void> {
    static propTypes = {
        delayPressIn: PropTypes.number,
        borderless: PropTypes.bool,
        pressColor: PropTypes.string,
        children: PropTypes.node.isRequired,
        style: View.propTypes.style,
    };
    
    static defaultProps = {
        delayPressIn: 0,
        pressColor: 'rgba(0, 0, 0, .16)',
    };
    
    render () {
        if (Platform.OS === 'android' && Platform.Version >= LOLLIPOP) {
            return (
                <TouchableNativeFeedback
                    {...this.props}
                    background={TouchableNativeFeedback.Ripple(this.props.pressColor, this.props.borderless)}
                >
                    {this.props.children}
                </TouchableNativeFeedback>
            );
        } else {
            return (
                <TouchableOpacity {...this.props}>
                    {this.props.children}
                </TouchableOpacity>
            );
        }
    }
}
