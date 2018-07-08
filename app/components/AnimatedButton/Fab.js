/* @flow */
import React from 'react';
import ReactNative from 'react-native';
import BaseButton from './BaseButton';
import TouchButton from '../Core/TouchButton';
import AnimatedOverlay from '../AnimatedOverlay';
import ProgressBar from '../Core/ProgressBar';
import styles from './styles';

const {
    Animated,
    Dimensions,
    Easing,
    Text,
    View,
    Platform,
} = ReactNative;

const {height: WINDOW_HEIGHT, width: WINDOW_WIDTH} = Dimensions.get('window');

export default class AnimatedButton extends BaseButton {
    componentDidUpdate (prevProps) {
        if (this.props.startAnimation && prevProps.startAnimation !== this.props.startAnimation) {
            
            //noinspection Eslint
            let collapseButtonAnimation = Animated.timing(this._animatedValue, {
                toValue: {
                    x: WINDOW_WIDTH / 2 - this.state.overlayOptions.left - this.state.overlayOptions.initialWidth / 2,
                    y: WINDOW_HEIGHT / 2 - this.state.overlayOptions.top - this.state.overlayOptions.initialHeight / 2
                },
                easing: Easing.linear,
                duration: this.props.duration,
                useNativeDriver: false
            });
            Animated.sequence([ Animated.delay(200), collapseButtonAnimation ])
                .start(() => {
                    global.requestAnimationFrame(() => {
                        this.setState({
                            showOverlay: true
                        });
                    });
                });
            //noinspection Eslint
            this.setState({spinner: true});
        }
    }
    
    _animatedValue = new Animated.ValueXY();
    
    render () {
        const {props} = this;
        let animatedStyle = {
            width: props.width,
            height: props.width,
            backgroundColor: props.backgroundColor,
            borderRadius: props.width / 2,
            transform: this._animatedValue.getTranslateTransform()
        };
        
        let iOSStyle = Platform.OS === 'ios' ? props.style : {};
        let androidStyle = Platform.OS === 'android' ? props.style : {};
        
        return (
            <View
                pointerEvents={'box-none'}
                style={styles.fabContainer}
            >
                <View
                    pointerEvents={'box-none'}
                    style={styles.fabButtonContainer}
                >
                    <TouchButton
                        enabled={!props.disabled}
                        onPress={this.props.onPress}
                        rippleColor={props.rippleColor}
                        style={iOSStyle}
                    >
                        <Animated.View
                            ref="animatedOverlayButton"
                            style={[ styles.buttonContainer, androidStyle, animatedStyle ]}>
                            {this.props.spinner || this.state.spinner ? <ProgressBar color={props.spinnerColor}
                                                                                     style={styles.loader}/>
                                :this.props.children || <Text
                                style={[ styles.buttonText, {color: props.fontColor} ]}>{props.text.toUpperCase()}</Text> }
                        </Animated.View>
                    </TouchButton>
                    <AnimatedOverlay
                        onOverlayVisible={this.onOverlayVisible.bind(this)}
                        overlayColor={props.overlayColor}
                        overlayOptions={
                            {
                                ...this.state.overlayOptions,
                                left: WINDOW_WIDTH / 2 - this.state.overlayOptions.initialWidth / 2,
                                top: WINDOW_HEIGHT / 2 - this.state.overlayOptions.initialHeight / 2
                            }
                        }
                        showOverlay={this.state.showOverlay}
                    />
                </View>
            </View>
        );
    }
}

