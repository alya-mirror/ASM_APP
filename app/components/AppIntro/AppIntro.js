import React from 'react';
const {
    PureComponent,
    PropTypes
} = React;
import * as Animatable from 'react-native-animatable';
import {ScrollView, Image, StatusBar, View, Text, LayoutAnimation,Dimensions,
    Alert, Animated,TouchableOpacity,TouchableHighlight,TouchableWithoutFeedback,StyleSheet,} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles, {TrainingScreenStyle} from './styles';
import SmartScrollView from 'react-native-smart-scroll-view';
import AppText from '../Core/AppText';
import AnimatedLogo from '../AnimatedLogo';
import Colors from '../../utils/Colors';
import {RectangularButton , TrainingRectangularButton} from '../AnimatedButton';
import dismissKeyboard from "react-native-dismiss-keyboard";
import {validateEmail, validatePassword} from "../../lib/validator";
import AppIntros from 'react-native-app-intro';
const io = require('socket.io-client');


type State = {
    startAnimation: boolean,
}

type Props = {
    logout: Function,
}
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

export default class AppIntro extends PureComponent<void, Props, State> {
    static propTypes: Props = {
        logout: PropTypes.func,
    };

    constructor(props) {
        super(props);
       // this.url = 'http://192.168.100.4:3100';
       // this.socket = io.connect('http://192.168.100.4:3100');
       this.socket = new io.connect('http://192.168.100.4:3100', {
            transports: ['websocket'] // you need to explicitly tell it to use websockets
        });
        this.socket.on('connect', () => {
            console.log("socket connected")});
        this.displayName = 'DragDropTest';
        this.numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        this.state = {
            startAnimation: false,
            sortable: false,
            longChecked: true,
            longCheckedPop:false,
        };
    }

    componentDidMount() {
        try {


        }
        catch (error) {
         //   bugsnag.notify(error);
            Alert.alert(
                'Wait!',
                'Sorry!' + error,
                [
                    {
                        text: 'Ignore', onPress: () => console.log('Cancel Pressed'), style: 'cancel'
                    },]
                , {cancelable: false}
            );
        }
    }

    onSkipBtnHandle = (index) => {
        //Alert.alert('Skip');
        console.log(index);
        Actions.home();
    }
    doneBtnHandle = () => {
       // Alert.alert('Done');

    }
    nextBtnHandle = (index) => {
       // Alert.alert('Next');
        console.log(index);
    }
    onSlideChangeHandle = (index, total) => {
        console.log(index, total);
    }
    _onPress () {

    }

    _onAnimationComplete () {
       Actions.home();
    }

    render() {
        const pageArray = [{
            title: 'Page 1',
            description: 'Description 1',
            img: 'https://goo.gl/Bnc3XP',
            imgStyle: {
                height: 80 * 2.5,
                width: 109 * 2.5,
            },
            backgroundColor: '#fa931d',
            fontColor: '#fff',
            level: 10,
        }, {
            title: 'Page 2',
            description: 'Description 2',
            img: require('../../../assets/avatar.png'),
            imgStyle: {
                height: 93 * 2.5,
                width: 103 * 2.5,
            },
            backgroundColor: '#a4b602',
            fontColor: '#fff',
            level: 10,
        }];
        const {
            startAnimation,
            isRecordUpdating,
            completeActionTraining,
        } = this.state;
        return (
            <AppIntros
                onNextBtnClick={this.nextBtnHandle}
                onDoneBtnClick={this.doneBtnHandle}
                onSkipBtnClick={this.onSkipBtnHandle}
                onSlideChange={this.onSlideChangeHandle}
                pageArray={pageArray}
            />
        );


    }
}
