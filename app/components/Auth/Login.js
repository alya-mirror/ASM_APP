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
import config from '../../../config.default'

var io = require('socket.io-client');
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

  constructor(props) {
    super(props);
    this.url = 'http://localhost:3100';
    this.socket = io.connect('http://localhost:3100', {reconnect: true});
    this.socket.on('connect', function () {
      console.log('connected')
    });
    this.state = {
      email: 'John@yahoo.com',
      emailErrorMessage: null,
      password: 'qwe123',
      passwordErrorMessage: null,
      onCompleteFlag: 0,
      trainUserID: '',
      startAnimation: false,
      startAnimationSignUp: false,
      isRecordUpdating: false,
      hideWelcomeMessage: false,
    };
  }

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
    dismissKeyboard();
    if (!this.state.emailErrorMessage && this.state.email && !this.state.passwordErrorMessage && this.state.password) {
      this.setState({
        startAnimation: true
      });
      return fetch('http://' + config.host + ':3100/api/user/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(
          {
            email: this.state.email,
            password: this.state.password,
          }
        )
      }).then((response) => response.json())
      .then((responseJson) => {
        console.log('log in ' + JSON.stringify(responseJson))
        global.userInfo = responseJson;
        if (global.userInfo.trained) {
          this._fetchUserAddons();
        }
        else {
          this._trainUser(global.userInfo.userId);
        }


      })

      .catch((error) => {
        console.log(error);

      });
    }
    else {
      // smooth keyboard animation
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this._checkEmail(this.state.email);
      this._checkPassword(this.state.password);
    }

  }


  _trainUser(userID) {
    console.log("hello from train", userID)
    this.setState({
      startAnimation: true,
      onCompleteFlag: 2,
      trainUserID: userID,
    });

    /*this.socket.emit('start_training', {"data":{"userId":userID}} );

    this.socket.on('finished_training',  (userData) => {
        console.log('complete training', userData)*/
    /*   if(userData.data.userId === global.userInfo.userID){
     this._fetchUserAddons();
     }

});*/
  }


  _fetchUserAddons() {
    const params = {userId: global.userInfo.userId};
    let url = `http://localhost.:3100/api/addons/userId${encodeURIComponent(global.userInfo.userId)}`;
    console.log('Addons');
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
    }).then((response) => {
      console.log('user addons are  ' + JSON.stringify(response))
      global.userAddons = response;
      console.log('response', response.status)
      if (response.status === 200) {
        console.log('Addons', response)
        this._updateRecord();

      }
    })

    .catch((error) => {
      console.log(error);

    });
  }


  _onAnimationComplete() {
    if (this.state.onCompleteFlag === 1) {
      Actions.home();
    } else if (this.state.onCompleteFlag === 2) {
      //  Actions.TrainContainer({userID: this.state.trainUserID})
      Actions.AppIntroContainer({userID: this.state.trainUserID})
      // Actions.PluginSetting({text: "name"});
      //Actions.home();
    }

  }

  _onPressSignUp() {
    Actions.signUp();
    // setTimeout({},1000)
  }

  async _updateRecord() {
    // this.setState({isRecordUpdating: true});
    // Hint -- can make service call and check;
    // Demo
    // this.setState({isRecordUpdating: false});
    this.setState({
      startAnimation: true,
      onCompleteFlag: 1,
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
    //this._checkEmail(email);
    this.setState({email, emailErrorMessage: null});
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

  _onPasswordChange(password) {
    // this._checkPassword(password);
    this.setState({password, passwordErrorMessage: null});
  }

  render() {
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
            <View style={styles.signUpTextView}>
              <AppText
                style={styles.signUpText}>Do not have an account?</AppText><AppTextButton
              onPress={this._onPressSignUp.bind(this)} style={styles.signUpText}> Sign Up </AppTextButton>
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
