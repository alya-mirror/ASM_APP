
import React from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import SmartScrollView from 'react-native-smart-scroll-view';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import styles from './styles';
import {RectangularButton, Bar} from '../AnimatedButton';
import AnimatedLogo from '../AnimatedLogo';
import Colors from '../../utils/Colors';
import GroupTextField from '../Core/GroupTextField';
import AppText from '../Core/AppText';
import AppTextButton from '../Core/AppTextButton';
import {validateEmail, validatePassword} from '../../lib/validator';

const {
    PureComponent,
} = React;

const {
    View,
    Image,
    Dimensions,
    StatusBar,
    Keyboard,
    LayoutAnimation
} = ReactNative;

type State = {
    email: string,
    emailErrorMessage: string,
    password: string,
    passwordErrorMessage: string,
    isRecordUpdating: boolean,
    startAnimation: boolean,
    hideWelcomeMessage: boolean
}

const {width: WINDOW_WIDTH} = Dimensions.get('window');

export default class Login extends PureComponent<void, void, State> {
    state: State = {
        email: 'a',
        emailErrorMessage: null,
        password: 'a',
        passwordErrorMessage: null,
        startAnimation: false,
        startAnimationSignUp: false,
        isRecordUpdating: false,
        hideWelcomeMessage: false,
    };
    
    componentWillMount () {
        // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
        // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }
    
    _keyboardDidShow () {
        this.setState({
            hideWelcomeMessage: true
        });
    }
    
    _keyboardDidHide () {
        this.setState({
            hideWelcomeMessage: false
        });
    }
    
    _onPress () {
        dismissKeyboard();
        if (!this.state.emailErrorMessage && this.state.email && !this.state.passwordErrorMessage && this.state.password) {
            this._updateRecord();
        }
        else {
            // smooth keyboard animation
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            this._checkEmail(this.state.email);
            this._checkPassword(this.state.password);
        }
        
    }

    _onAnimationComplete () {
        Actions.home();
    }
    _onPressSignUp () {
        Actions.signUp();
     // setTimeout({},1000)
    }
    async _updateRecord () {
        // this.setState({isRecordUpdating: true});
        // Hint -- can make service call and check;
        // Demo
        // this.setState({isRecordUpdating: false});
        this.setState({
            startAnimation: true
        });
    }
    
    _checkEmail (email) {
        let errorMessage = validateEmail(email);
        if (!errorMessage) {
            this.setState({email, emailErrorMessage: null});
        }
        else {
            this.setState({email, emailErrorMessage: errorMessage});
        }
    }
    
    _onEmailChange (email) {
       //this._checkEmail(email);
        this.setState({email, emailErrorMessage: null});
    }
    
    _checkPassword (password) {
        let errorMessage = validatePassword(password);
        if (!errorMessage) {
            this.setState({password, passwordErrorMessage: null});
        }
        else {
            this.setState({password, passwordErrorMessage: errorMessage});
        }
    }
    
    _onPasswordChange (password) {
       // this._checkPassword(password);
        this.setState({password, passwordErrorMessage: null});
    }
    
    render () {
        const {
            email,
            emailErrorMessage,
            passwordErrorMessage,
            password,
            startAnimation,
            startAnimationSignUp,
            isRecordUpdating,
            hideWelcomeMessage
        } = this.state;
        return (
            <SmartScrollView
                contentContainerStyle={styles.container}
            >
                <StatusBar
                    animated
                    backgroundColor={Colors.primaryDark}
                    barStyle="light-content"
                    translucent
                />
                <Image
                    source={require('../../../assets/login_background.png')}
                    style={styles.imageContainer}
                >
                    <View style={styles.logoContainer}>
                        <AnimatedLogo
                            borderColor={Colors.white}
                            borderRadius={35}
                            duration={2000}
                            fontColor="#FFF"
                            image={<Image source={require('../../../assets/avatar07.png')}/>}
                            size={100}
                        />
                        {
                            !hideWelcomeMessage &&
                            <AppText
                                style={styles.logoContent}> </AppText>
                        }
                    </View>
                    <View
                        style={styles.loginContainer}>
                        <GroupTextField
                            label="Email"
                            onChangeText={this._onEmailChange.bind(this)}
                            value={email}
                            warningMessage={emailErrorMessage}
                        />
                        <GroupTextField
                            label="Password"
                            onChangeText={this._onPasswordChange.bind(this)}
                            secureTextEntry
                            value={password}
                            warningMessage={passwordErrorMessage}
                        />
                        <RectangularButton
                            duration={1000}
                            fontColor="#FFF"
                            formCircle={true}
                            onComplete={this._onAnimationComplete.bind(this)}
                            onPress={this._onPress.bind(this)}
                            spinner={isRecordUpdating}
                            startAnimation={startAnimation}
                            text="Sign In"
                            width={WINDOW_WIDTH}
                        />
                        <View  style={styles.signUpTextView}>
                        <AppText
                            style={styles.signUpText}>Do not have an account?</AppText><AppTextButton onPress={this._onPressSignUp.bind(this)} style={styles.signUpText}> Sign Up </AppTextButton>
                        </View>
                       {/* <Bar
                            duration={1000}
                            fontColor="#FFF"
                            formCircle={true}
                            onComplete={this._onAnimationComplete.bind(this)}
                            onPress={this._onPressSignUp.bind(this)}
                            spinner={isRecordUpdating}
                            startAnimation={startAnimationSignUp}
                        />*/}
                    </View>
                </Image>
            </SmartScrollView>
        );
    }
}
