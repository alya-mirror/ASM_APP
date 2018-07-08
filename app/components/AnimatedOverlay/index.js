
import React from 'react';
import ReactNative from 'react-native';
import styles from './styles';
import Colors from '../../utils/Colors';
import {OverlayOptions} from '../../types';

const {
    PureComponent,
    PropTypes
} = React;

const {
    Animated,
    Dimensions,
    Easing,
    Modal,
} = ReactNative;

const {height: WINDOW_HEIGHT, width: WINDOW_WIDTH} = Dimensions.get('window');

type State = {
    isVisible: boolean;
    overlayOptions: OverlayOptions;
}

type Props = {
    overlayOptions: OverlayOptions,
    showOverlay: boolean,
    onOverlayVisible: Function,
    overlayColor: string
}
/**
 * Animated Overlay cover entire screen during animation
 * Example
 *```
 *   <AnimatedOverlay
 *     onOverlayVisible={'bool'}
 *     overlayColor={'color}
 *     overlayOptions={'OverlayOptions'}
 *     showOverlay={'bool'}
 *   />
 *```
 */
export default class AnimatedOverlay extends PureComponent<void, Props, State> {
    static propTypes = {
        /** Overlay Options of type OverlayOptions */
        overlayOptions: PropTypes.any,
        /** show overlay */
        showOverlay: PropTypes.bool,
        /** OnOverlay visible event */
        onOverlayVisible: PropTypes.func,
        /** overlay color */
        overlayColor: PropTypes.string
    };
    
    state: State = {
        isVisible: false,
        overlayOptions: {
            backgroundColor: Colors.transparent,
            top: -500,
            left: -500,
            initialWidth: 0,
            initialHeight: 0,
        },
    };
    
    componentWillMount () {
        this._overlayAnimatedValue = new Animated.Value(1);
        this._overlayOpacityAnimatedValue = new Animated.Value(1);
    }
    
    componentDidUpdate (prevProps: Props) {
        if (prevProps.overlayOptions && this.props.overlayOptions) {
            if (prevProps.showOverlay !== this.props.showOverlay && this.props.showOverlay === true) {
                this.show(this.props.overlayOptions);
            }
        }
    }
    
    show (overlayOptions: OverlayOptions) {
        this.setState(
            {
                isVisible: true,
                overlayOptions
            }
        );
        
        Animated.sequence([
            Animated.timing(this._overlayAnimatedValue, {
                toValue: Math.hypot(WINDOW_HEIGHT, WINDOW_WIDTH) / (overlayOptions.initialHeight / 2), // worst case,
                duration: 700,
                easing: Easing.circle,
                useNativeDriver: false
            }),
            Animated.timing(this._overlayOpacityAnimatedValue, {
                toValue: 0.8, // worst case,
                duration: 50,
                easing: Easing.linear,
                useNativeDriver: false
            }),
        ]).start(() => {
            this.props.onOverlayVisible();
        });
    }
    
    render () {
        const {state} = this;
        const {
            backgroundColor,
            top,
            left,
            initialHeight,
        } = this.state.overlayOptions;
        
        const animatedStyle = {
            backgroundColor,
            top,
            left,
            width: initialHeight,
            height: initialHeight,
            borderRadius: initialHeight / 2,
            transform: [ {scale: this._overlayAnimatedValue} ],
        };
        
        return (
            <Modal
                animationType="fade"
                onRequestClose={() => {}}
                transparent
                visible={state.isVisible}
            >
                <Animated.View
                    style={[ styles.circle, animatedStyle, {backgroundColor: this.props.overlayColor} ]}/>
            </Modal>
        
        );
    }
}
