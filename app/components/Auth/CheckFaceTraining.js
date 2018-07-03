import React from 'react';
import config from '../../../config.default'

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
import image_youtube from '../Home/images/youtube.png'
import image_time from '../Home/images/time.png'
import recog from '../Home/images/recog.png'
import temperature from '../Home/images/temperature.png'
import light from '../Home/images/light.png'
import voice from '../Home/images/voice.png'
import gesture from '../Home/images/gesture.png'
import image_calendar from '../Home/images/calendar.png'
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
import TypingText from 'react-native-typing-text';
const {width: WINDOW_WIDTH} = Dimensions.get('window');

export default class CheckFaceTraining extends PureComponent<void, Props, State> {
    static propTypes: Props = {
        logout: PropTypes.func,
    };

    constructor(props) {
        super(props);
       // this.url = 'http://192.168.0.6:3100';
       // this.socket = io.connect('http://192.168.0.6:3100');
       this.socket = new io.connect('http://'+config.host+':3100', {
            transports: ['websocket'] // you need to explicitly tell it to use websockets
        });
        this.socket.on('connect', () => {
            console.log("socket connected")});
        this.displayName = 'DragDropTest';
        this.numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        this.state = {
            startAnimation: false,
            animation: new Animated.Value(0),
            candidates: [],
            sortable: false,
            longChecked: true,
            longCheckedPop:false,
            searchTerm: '',
            searchTermPop:'',
            isRecordUpdating: false,
            completeActionTraining:false,
            hideWelcomeMessage: false,
            longPressActivatedForManaging:false,
            startAnimationValueTo:0,
            scrollEnabled: true,
            disabled: false,
            managementButtonText: 'Manage',
            opacity: new Animated.Value(0),
            animated: {
                fromPositiontop: new Animated.Value(0),
            },
        };
        this._sortableSudokuGrid = null
        this._updateRecord = this._updateRecord.bind(this);
    }

    componentDidMount() {
        try {

            this.socket.on('connect', () => {
                console.log("socket connected in train", global.userInfo.userId);
                this.socket.emit("start_training",JSON.stringify({"data": {"userId": global.userInfo.userId}}))
                this._onPress();
                this.socket.on("finished_training", (userData) => {
                    console.log('complete training', userData);
                    if(userData.data.userId === global.userInfo.userId){
                        this._fetchUserAddons();
                    }

                });
            });

            this.socket.on('connect_error', (err) => {
                console.log(err)
            });

            this.socket.on('disconnect', () => {
                console.log("Disconnected Socket!")
            })
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


    _fetchUserAddons(){
        let coreAddons = [['123', 'Face Recog',recog,' '],['123456', 'Gesture',gesture,' '],['1234', 'voice Recog',voice,' ']
            ,['1234567', 'Sensor Data',light,' ']];
        global.userAddons = coreAddons;
        let userAddons = new Array();
        let approvedAddons = new Array();
        let addonName='';
        let iconName='';
        return fetch(`http://${config.host}:3100/api/addons/:${encodeURIComponent(global.userInfo.userId)}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
        }).then((response) => response.json())
            .then((responseJson) => {

               for(let addon of responseJson.userInstalledAddons ){
                    if(addon.description.toString().indexOf('clock')>-1){
                       addonName='Clock'
                        iconName=image_time;
                    }
                    else if(addon.description.toString().indexOf('youtube')>-1){
                        addonName='Youtube'
                        iconName=image_youtube;
                    }else if(addon.description.toString().indexOf('date/time')>-1){
                        addonName='Date Time'
                        iconName=image_calendar;
                    }
                    global.userAddons.push([addon._id ,addonName ,iconName ,addon.npm_name]);
                    addonName=''
                    iconName='';
                }

                for(let addon of responseJson.userUninstalledAddons ){
                    addonName=''
                    iconName='';
                    if(addon.description.toString().indexOf('clock')>-1){
                        addonName='Clock'
                        iconName=image_time;
                    }
                    else if(addon.description.toString().indexOf('youtube')>-1){
                        addonName='Youtube'
                        iconName=image_youtube;
                    }else if(addon.description.toString().indexOf('date/time')>-1){
                        addonName='Date Time'
                        iconName=image_calendar;
                    }
                    approvedAddons.push([addon._id ,addonName ,iconName ,addon.npm_name])

                }
               // global.userAddons= userAddons;
                global.approvedAddons = approvedAddons;
                console.log('global train is  ' +  JSON.stringify(global.approvedAddons))
                setTimeout(()=> {  this.setState({
                    completeActionTraining:true,
                });
                },8000);

            })

            .catch((error) => {
                console.log(error);

            });
    }

    async _updateRecord () {
        // this.setState({isRecordUpdating: true});
        // Hint -- can make service call and check;
        // Demo
        // this.setState({isRecordUpdating: false});
        this.setState({
            startAnimation: true,
            completeActionTraining:false,
            onCompleteFlag:1,
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

    _onPress () {
        setTimeout(()=>{
            this._updateRecord();
            this._fetchUserAddons();
        },4000);


    }

    _onAnimationComplete () {
       Actions.home();
    }

    render() {
        const {
            startAnimation,
            isRecordUpdating,
            completeActionTraining,
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
                    source={require('../../../assets/train.png')}
                    style={styles.imageContainer}
                >
                    <View style={styles.logoContainerTrain}>
                        <AnimatedLogo
                            borderColor={Colors.white}
                            borderRadius={35}
                            duration={2000}
                            fontColor="#FFF"
                           // image={<Image source={require('../../../assets/avatar07.png')}/>}
                            size={100}
                        />
                        {

                        }
                    </View>

                    <View style={TrainingScreenStyle.container}>

                        <Text  style={TrainingScreenStyle.welcomeText}>
                            Welcome To
                        </Text>
                        <Text  style={TrainingScreenStyle.subTitleWelcomeText}>
                            A l y a   S m a r t   M i r r o r
                        </Text>
                        <View style={{ justifyContent: 'flex-start',
                            alignItems:'flex-start', textAlign:'left',marginTop:10, width:200}}>

                                <TypingText
                                    color =  "#999"
                                    textSize={12}

                                    typingAnimationDuration={50}
                                    blinkingCursorAnimationDuration={350}
                                    text = { global.userInfo.firstName + " please stand in front of Alya Smart Mirror so it can recognize you, " +
                                    "when this process is done this window will disappear!"}
                                />
                        </View>
                    </View>
          <View style={{marginBottom:50, marginTop:50}}>
                    <TrainingRectangularButton
                        duration={1000}
                        fontColor="#FFF"
                        formCircle={true}
                        onComplete={this._onAnimationComplete.bind(this)}
                        onPress={this._onPress.bind(this)}
                        spinner={isRecordUpdating}
                        startAnimation={startAnimation}
                        completeActionTraining={completeActionTraining}
                        text="Start Training"
                        width={WINDOW_WIDTH-150}
                    />
          </View>
                </Image>
            </SmartScrollView>
        );


    }
}
