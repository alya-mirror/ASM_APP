/* @flow */
import React from 'react';
import ReactNative from 'react-native';
import BaseButton from './BaseButton';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import TouchButton from '../Core/TouchButton';
import AnimatedOverlay from '../AnimatedOverlay';
import ProgressBar from '../Core/ProgressBar';
import styles from './styles';

const {
    Animated,
    Easing,
    Text,
    View,
} = ReactNative;

export default class TrainingRectangularButton extends BaseButton {
    
    componentWillMount () {
        super.componentWillMount();
        const {width} = this.props;
        this._animatedValue = new Animated.Value(width);
        this._animatedCircleValue = this._animatedValue.interpolate({
            inputRange: [ width / 1.5, width ],
            outputRange: [ 20, 0 ]
        });
    }
    
    componentDidUpdate (prevProps) {
        if (this.props.startAnimation && prevProps.startAnimation !== this.props.startAnimation) {
            //noinspection Eslint
            this.setState({spinner: true});
            let collapseButtonAnimation = Animated.timing(this._animatedValue, {
                toValue: 40,
                easing: Easing.linear,
                duration: this.props.duration,
                useNativeDriver: false
            });
            let animation = [];
            if (this.state.isKeyboardVisible) {
                dismissKeyboard();
                animation.push(Animated.delay(500));
            }
            animation.push(collapseButtonAnimation);
            Animated.sequence(animation)
                .start(() => {
                    global.requestAnimationFrame(() => {
                        this.setState({
                            showOverlay: this.props.completeActionTraining
                        });
                    });
                });
        }
    }
    
    _animatedValue: any = null;
    _animatedCircleValue: any = null;
    
    render () {
        const {props} = this;
        let animatedStyle = {
            width: this._animatedValue,
            backgroundColor: props.backgroundColor,
        };
        if (props.formCircle) {
            animatedStyle.borderRadius = this._animatedCircleValue;
        }
        return (
            <TouchButton
                enabled={!props.disabled}
                onPress={this.props.onPress}
                rippleColor={props.rippleColor}
            >
                <View style={styles.alignCenter}>
                    <View style={styles.buttonWithHeight}>
                        <Animated.View
                            ref="animatedOverlayButton"
                            style={[ styles.buttonContainer, animatedStyle ]}>
                            {this.props.spinner || this.state.spinner ? <ProgressBar color={props.spinnerColor}
                                                                                     style={styles.loader}/>
                                :<Text
                                style={[ styles.buttonText, {color: props.fontColor} ]}>{props.text.toUpperCase()}</Text>}
                        </Animated.View>
                        <AnimatedOverlay
                            onOverlayVisible={this.onOverlayVisible.bind(this)}
                            overlayColor={props.overlayColor}
                            overlayOptions={this.state.overlayOptions}
                            showOverlay={this.props.completeActionTraining}
                        />
                    </View>
                </View>
            </TouchButton>
        
        );
    }
}

