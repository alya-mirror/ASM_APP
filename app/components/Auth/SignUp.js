import React from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import SmartScrollView from 'react-native-smart-scroll-view';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import styles from './styles';
import {RectangularButton,TrainingRectangularButton} from '../AnimatedButton';
import AnimatedLogo from '../AnimatedLogo';
import Colors from '../../utils/Colors';
import GroupTextField from '../Core/GroupTextField';
import AppText from '../Core/AppText';
import AppTextButton from '../Core/AppTextButton';
import {validateEmail, validatePassword} from '../../lib/validator';
import config from '../../../config.default'

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

export default class SignUp extends PureComponent<void, void, State> {
    state: State = {
        firstName: 'ibrahim',
        email: 'a@a.com',
        emailErrorMessage: null,
        password: 'qwe123',
        passwordErrorMessage: null,
        startAnimation: false,
        completeActionTraining:false,
        isRecordUpdating: false,
        hideWelcomeMessage: false,
    };

    componentWillMount() {
        // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
        // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }

    _keyboardDidShow() {
        this.setState({
            hideWelcomeMessage: true
        });
    }

    _keyboardDidHide() {
        this.setState({
            hideWelcomeMessage: false
        });
    }

    _onPress() {
            console.log('sign up info ' , 'name ', this.state.firstName,'email ', this.state.email,'pass ' , this.state.password)
        this.setState({
            startAnimation: true,
        });
         dismissKeyboard();
         if (!this.state.emailErrorMessage && this.state.email && !this.state.passwordErrorMessage && this.state.password) {

             return fetch('http://'+config.host+':3100/api/user/', {
                 method: 'POST',
                 headers: {
                     'Accept': 'application/json',
                     'Content-type': 'application/json'
                 },
                 body: JSON.stringify(
                     {
                         email: this.state.email,
                         password: this.state.password,
                         firstName: this.state.firstName
                     }
                 )
             })
                 .then((response) => {
                    // this._updateRecord();
                        console.log('done ',response);
                     this._updateRecord()

                 })

                 .catch((error) => {
                     console.log(error);
                 });

         }
         else {
         // smooth keyboard animation
         LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
         this._checkEmail(this.state.email);
         this._checkPassword(this.state.password);  console.log('sign up info2 ')
         }


    }


    _onAnimationComplete() {
        Actions.login();
    }

    async _updateRecord() {
        // this.setState({isRecordUpdating: true});
        // Hint -- can make service call and check;
        // Demo
        // this.setState({isRecordUpdating: false});
        this.setState({
            completeActionTraining:true
        });


    }

    _checkEmail(email) {
        let errorMessage = validateEmail(email);
        if (!errorMessage) {
            this.setState({email, emailErrorMessage: null});
        }
        else {
            this.setState({email, emailErrorMessage: errorMessage});
        }
    }

    _onEmailChange(email) {
        this._checkEmail(email);
        //   this.setState({email, emailErrorMessage: null});
    }

    _checkPassword(password) {
        let errorMessage = validatePassword(password);
        if (!errorMessage) {
            this.setState({password, passwordErrorMessage: null});
        }
        else {
            this.setState({password, passwordErrorMessage: errorMessage});
        }
    }

    _onNameChange(firstName) {
        this.setState({firstName: firstName});
        //  this.setState({password, passwordErrorMessage: null});
    }

    _onPasswordChange(password) {
        this._checkPassword(password);
        //  this.setState({password, passwordErrorMessage: null});
    }

    _onPressLogin() {
        Actions.login();
        // setTimeout({},1000)
    }

    render() {
        const {
            email,
            firstName,
            emailErrorMessage,
            passwordErrorMessage,
            password,
            completeActionTraining,
            startAnimation,
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
                    source={require('../../../assets/loginUp.png')}
                    style={styles.imageContainer}
                >
                    <View style={styles.logoContainer}>
                        <AnimatedLogo
                            borderColor={Colors.primary1}
                            borderRadius={35}
                            duration={2000}
                            fontColor="#FFF"
                            image={<Image source={require('../../../assets/logo1.png')}/>}
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
                            label="First Name"
                            onChangeText={this._onNameChange.bind(this)}
                            value={firstName}
                            warningMessage={emailErrorMessage}
                        />
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
                        <TrainingRectangularButton
                            duration={800}
                            fontColor="#FFF"
                            formCircle={true}
                            onComplete={this._onAnimationComplete.bind(this)}
                            onPress={this._onPress.bind(this)}
                            spinner={isRecordUpdating}
                            startAnimation={startAnimation}
                            text="Sign Up"
                            completeActionTraining={completeActionTraining}
                            width={WINDOW_WIDTH}
                        />
                        <View style={styles.signUpTextView}>
                            <AppText
                                style={styles.signUpText}>You already have an account? </AppText><AppTextButton
                            onPress={this._onPressLogin.bind(this)} style={styles.signUpText}> Login </AppTextButton>
                        </View>
                    </View>
                </Image>
            </SmartScrollView>
        );
    }
}
