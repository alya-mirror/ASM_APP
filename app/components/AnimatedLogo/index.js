
/* @flow */
import React from 'react';
import ReactNative from 'react-native';
import Avatar from '../Core/Avatar';
import Colors from '../../utils/Colors';
import styles from './styles';

const {
    PureComponent,
    PropTypes,
} = React;

const {
    Animated,
    Easing,
    Image,
    View,
} = ReactNative;

type Props = {
    borderColor: string,
    borderRadius: number,
    borderWidth: number,
    color: string,
    icon: string,
    image: any,
    size: number,
    zIndex: number,
    duration: number,
}

/**
 * This component will show waves effect on border of Logo Image
 * Example
 *```
 *   <AnimatedLogo
 *     borderColor={'color'}
 *     borderRadius={'number'}
 *     duration={'number'}
 *     fontColor={'color'}
 *     image={<Image source={require('../../../assets/avatar07.png')}/>}
 *     size={'number'}
 *   />
 *```
 */
export default class AnimatedLogo extends PureComponent<void, Props, void> {
    static propTypes = {
        /** Color of wave */
        borderColor: PropTypes.string,
        /** border radius of avatar component */
        borderRadius: PropTypes.number,
        /** border width of avatar component */
        borderWidth: PropTypes.number,
        /** icon color of avatar component */
        color: PropTypes.string,
        /** icon avatar component */
        icon: PropTypes.string,
        /** logo image e.g. <Image /> */
        image: PropTypes.shape({type: PropTypes.oneOf([ Image ])}).isRequired,
        /** size of logo */
        size: PropTypes.number,
        /** zIndex color of avatar component */
        zIndex: PropTypes.number,
        /** duration of wave animation start again */
        duration: PropTypes.number,
    };
    
    static defaultProps = {
        borderColor: Colors.white,
    };
    
    componentWillMount () {
        const {size} = this.props;
        this._animated1Value = new Animated.Value(size);
        this._axisAnimated1Value = this._animated1Value.interpolate({
            inputRange: [ size, size + 40 ],
            outputRange: [ 30, 10 ]
        });
        this._radiusAnimated1Value = this._animated1Value.interpolate({
            inputRange: [ size, size + 40 ],
            outputRange: [ 2, 1 ]
        });
        this._opacityAnimated1Value = this._animated1Value.interpolate({
            inputRange: [ size, size + 40 ],
            outputRange: [ 1, 0.2 ]
        });
        
        this._animated2Value = this._animated1Value.interpolate({
            inputRange: [ size, size + 40 ],
            outputRange: [ size + 20, size + 60 ]
        });
        
        this._axisAnimated2Value = this._animated1Value.interpolate({
            inputRange: [ size, size + 40 ],
            outputRange: [ 20, 0 ]
        });
        this._radiusAnimated2Value = this._animated1Value.interpolate({
            inputRange: [ size, size + 40 ],
            outputRange: [ 1.2, 0.8 ]
        });
        this._opacityAnimated2Value = this._animated1Value.interpolate({
            inputRange: [ size, size + 40 ],
            outputRange: [ 1, 0.2 ]
        });
    }
    
    componentDidMount () {
        const {size, duration} = this.props;
        global.requestAnimationFrame(() => {
            this.cycleAnimation(size, size + 40, duration);
        });
    }
    
    _animated1Value: any = null;
    _axisAnimated1Value: any = null;
    _radiusAnimated1Value: any = null;
    _opacityAnimated1Value: any = null;
    
    _animated2Value: any = null;
    _axisAnimated2Value: any = null;
    _radiusAnimated2Value: any = null;
    _opacityAnimated2Value: any = null;
    
    cycleAnimation (initialRadius, maxRadius, duration) {
        Animated.sequence([
            Animated.timing(this._animated1Value, {
                toValue: maxRadius,
                easing: Easing.linear,
                duration,
                useNativeDriver: false
            }),
            Animated.timing(this._animated1Value, {
                toValue: initialRadius,
                easing: Easing.linear,
                duration: 0,
                useNativeDriver: false
            })
        ]).start(() => {
            global.requestAnimationFrame(() => {
                this.cycleAnimation(initialRadius, maxRadius, duration);
            });
        });
    }
    
    render () {
        return (
            <View style={[ styles.container, {width: this.props.size + 60, height: this.props.size + 60} ]}>
                <Animated.View
                    style={[ {
                        position: 'absolute',
                        top: this._axisAnimated1Value,
                        left: this._axisAnimated1Value,
                        right: 0,
                        bottom: 0,
                        opacity: this._opacityAnimated1Value,
                        borderWidth: this._radiusAnimated1Value,
                        borderRadius: this._animated1Value,
                        width: this._animated1Value,
                        height: this._animated1Value,
                        borderColor: this.props.borderColor
                    } ]}/>
                <Animated.View
                    style={[ {
                        position: 'absolute',
                        top: this._axisAnimated2Value,
                        left: this._axisAnimated2Value,
                        right: 0,
                        bottom: 0,
                        opacity: this._opacityAnimated2Value,
                        borderWidth: this._radiusAnimated2Value,
                        borderRadius: this._animated2Value,
                        width: this._animated2Value,
                        height: this._animated2Value,
                        borderColor: this.props.borderColor

                    } ]}/>
                <Avatar
                    {...this.props}
                />
            </View>
        );
    }
}
