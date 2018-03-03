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

export default class CheckFaceTraining extends PureComponent<void, Props, State> {
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
            setTimeout(()=> { this.setState({
                startAnimation: true,
                completeActionTraining:false
            });
            },2000);

            this.socket.on('connect', () => {
                console.log("socket connected in train", this.props.userID);
                this.socket.emit("start_training",JSON.stringify({"data": {"userId": this.props.userID}}))
                this.socket.on('finished_training', (userData) => {
                    console.log('complete training', userData);
                    if(userData.data.userId === this.props.userID){
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
        return fetch('http://192.168.100.4:3100/api/addons/:userId', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
        })   .then((response) => response.json())
            .then((responseJson) => {
                console.log('user addons are  ' +  JSON.stringify(responseJson))
                if(responseJson.status === 200){
                    global.userAddons=responseJson;
                    //  this._updateRecord();
                }

            })

            .catch((error) => {
                console.log(error);

            });
    }

     _updateRecord (userID) {
        // this.setState({isRecordUpdating: true});
        // Hint -- can make service call and check;
        // Demo
        // this.setState({isRecordUpdating: false});

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
        this._updateRecord();
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
                    source={require('../../../assets/backgroundS.jpg')}
                    style={styles.imageContainer}
                >
                    <View style={TrainingScreenStyle.container}>
                        <Text  style={TrainingScreenStyle.welcomeText}>
                            Welcome To
                        </Text>
                        <Text  style={TrainingScreenStyle.subTitleWelcomeText}>
                            A l y a   S m a r t   M i r r o r
                        </Text>
                        <Text  style={TrainingScreenStyle.startingText}>
                            {global.userInfo.firstName} Please stand in front of Alya Smart Mirror so it can recognize you, when this process is done this window will
                            disappear!
                        </Text>
                    </View>
          <View style={{marginBottom:100}}>
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
