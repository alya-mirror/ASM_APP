/* @flow */
import React from 'react';
import ReactNative from 'react-native';
import Colors from '../../utils/Colors';
import {OverlayOptions} from '../../types';

const {
    PureComponent,
    PropTypes,
} = React;

const {
    findNodeHandle,
    LayoutAnimation,
    Keyboard,
    Platform
} = ReactNative;

const UIManager = require('NativeModules').UIManager;

type Props = {
    backgroundColor: string,
    children: any,
    overlayColor: string,
    containerStyle: any,
    width: number,
    disabled: boolean,
    fontColor: string,
    duration: number,
    onPress: Function,
    formCircle: boolean,
    rippleColor: string,
    spinner: boolean,
    spinnerColor: string,
    startAnimation: boolean,
    onComplete: Function,
    style: any,
    text: string,
    showOverlay: Function,
    overlay: any,
}

type State = {
    spinner: boolean,
    showOverlay: boolean,
    overlayOptions: {
        width: number,
        height: number,
        left: number,
        top: number
    },
    isKeyboardVisible: boolean,
}

/**
 * ##RectangularButton example - Ref -Login Component for more details
 *```
 *   <RectangularButton
 *     duration={'number'}
 *     fontColor={'color}
 *     formCircle={'bool'}
 *     onComplete={'Function'}
 *     onPress={'Function'}
 *     spinner={'bool'}
 *     startAnimation={'bool'}
 *     text="Sign In"
 *     width={'number'}
 *   />
 *```
 *
 * ##Fab example (Floating Button) - Ref- Home Component for more details
 *
 *```
 *   <Fab
 *     duration={'number'}
 *     onComplete={'Function'}
 *     onPress={'Function'}
 *     rippleColor={'color'}
 *     spinner={'bool'}
 *     startAnimation={'bool'}
 *     style={styles.fabButton}
 *     text="Sign In"
 *     width={'number'}
 *   >
 *    <Icons
 *      color={Colors.white}
 *      name="sign-out"
 *      size={18}
 *    />
 *   </Fab>
 *```
 */
export default class BaseButton extends PureComponent<Props, Props, State> {
    static propTypes:Props = {
        /** background color of animated button */
        backgroundColor: PropTypes.string,
        children: PropTypes.node,
        /** overlay color */
        overlayColor: PropTypes.string,
        containerStyle: PropTypes.any,
        /** button width */
        width: PropTypes.number.isRequired,
        disabled: PropTypes.bool,
        /** font/icon color */
        fontColor: PropTypes.string,
        /** duration of animation*/
        duration: PropTypes.number,
        onPress: PropTypes.func.isRequired,
        formCircle: PropTypes.bool,
        /** ripple color when button pressed*/
        rippleColor: PropTypes.string,
        /** show spinner */
        spinner: PropTypes.bool,
        /** spinner color */
        spinnerColor: PropTypes.string,
        /** start animation */
        startAnimation: PropTypes.bool,
        /** onAnimation Complete Event */
        onComplete: PropTypes.func,
        /** Button Style */
        style: PropTypes.any,
        /** Button text, if children is not added */
        text: PropTypes.string,
        /** Button when the training is done */
        completeActionTraining: PropTypes.bool,
    };
    
    static defaultProps:Props = {
        spinnerColor: Colors.white,
        fontColor: Colors.white,
        spinner: false,
        backgroundColor: Colors.overlayColor,
        overlayColor: Colors.overlayColor,
        duration: 500,
        width: 140,
        formCircle: true,
        text: ''
    };
    
    constructor () {
        super();
        // Enable LayoutAnimation under Android
        if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    
    state:State = {
        spinner: false,
        showOverlay: false,
        overlayOptions: {
            width: 0,
            height: 0,
            left: 0,
            top: 0
        },
        isKeyboardVisible: false,
    };
    
    componentWillMount () {
        // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
        // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidShow.bind(this));
    }
    
    componentDidMount () {
        global.requestAnimationFrame(() => {
            this.measure((fx, fy, width, height, pageX, pageY) => {
                this.setState({
                    overlayOptions: {
                        initialHeight: height,
                        initialWidth: width,
                        left: pageX + width / 2 - height / 2,
                        top: pageY
                    }
                });
            });
        });
    }
    
    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    
    _keyboardDidShow () {
        // smooth keyboard animation
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({
            isKeyboardVisible: !this.state.isKeyboardVisible
        });
    }
    
    measure (cb) {
        return this.refs.animatedOverlayButton && UIManager.measure(findNodeHandle(this.refs.animatedOverlayButton), cb);
    }
    
    onOverlayVisible () {
        global.requestAnimationFrame(() => {
            this.props.onComplete();
        });
    }
    
    render () {
        return null;
    }
}

