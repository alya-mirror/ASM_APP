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
import {styles} from './styles';
import SmartScrollView from 'react-native-smart-scroll-view';
import AppText from '../Core/AppText';
import AnimatedLogo from '../AnimatedLogo';
import Colors from '../../utils/Colors';
import {RectangularButton , TrainingRectangularButton} from '../AnimatedButton';
import dismissKeyboard from "react-native-dismiss-keyboard";
import {validateEmail, validatePassword} from "../../lib/validator";
import AppIntros from 'react-native-app-intro';
const io = require('socket.io-client');
import Page1 from '../../../assets/profile/profile01.png';
import Page2 from '../../../assets/introScreen/2.png';
import Page3 from '../../../assets/introScreen/2.png';
import Page4 from '../../../assets/introScreen/2.png';

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
       this.socket = new io.connect('http://'+config.host+'', {
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
        Actions.TrainContainer({userID: this.state.trainUserID})
    }
    doneBtnHandle = () => {
        Actions.TrainContainer({userID: this.state.trainUserID})

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
            img: require( '../../../assets/introScreen/4.png'),
            imgStyle: {
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width,
                paddingTop:100,
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
                showSkipButton={true}
                leftTextColor={Colors.primary}
                rightTextColor={Colors.primary}
                dotColor={Colors.primaryLight}
                activeDotColor={Colors.primary}
                showDots={true}
                showDoneButton={true}
               >

                <View style={{backgroundColor:'#fff', height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width,}}>
                    <Image
                        source={require('../../../assets/introScreen/1.png')}
                        style={styles.imageContainer}
                    >
                        <StatusBar
                            animated
                            backgroundColor={Colors.primaryDark}
                            barStyle="light-content"
                            translucent
                        />
                       <View style={{width: Dimensions.get('window').width, height:'50%',paddingTop:60,
                       alignItems:'center'}}>
                        <Text style={{ color:'#787878',fontSize:25, fontWeight:'500' ,}}>Face Recognition</Text>
                           <Text fontStyle={ 'italic'} style={{ textAlign:'center', color:'#afafaf',marginTop:10, textDecoration:'italic', width:300}}>You will have to stand in
                           front of Alya Smart Mirror so it can recognise you and speak with you as well and this will help in the next steps.</Text>
                       </View>
                    </Image>
                </View>
                <View style={{backgroundColor:'#fff', height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width,}}>
                    <Image
                        source={require('../../../assets/introScreen/2.png')}
                        style={styles.imageContainer}
                    >
                        <View style={{width: Dimensions.get('window').width, height:'50%',paddingTop:60,
                            alignItems:'center'}}>
                            <Text style={{ color:'#787878',fontSize:25, fontWeight:'500' ,}}>Explore</Text>
                            <Text fontStyle={ 'italic'} style={{ textAlign:'center', color:'#afafaf',marginTop:10, textDecoration:'italic', width:280}}>
                                Explore the installed Add-ons on Alya Smart Mirror and configure them through Alya Mobile App.  </Text>
                        </View>
                    </Image>
                </View>
                <View style={{backgroundColor:'#fff', height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width,}}>
                    <Image
                        source={require('../../../assets/introScreen/3.png')}
                        style={styles.imageContainer}
                    >
                        <View style={{width: Dimensions.get('window').width, height:'50%',paddingTop:60,
                            alignItems:'center'}}>
                            <Text style={{ color:'#787878',fontSize:25, fontWeight:'500' ,}}>Find New Add-Ons</Text>
                            <Text fontStyle={ 'italic'} style={{ textAlign:'center', color:'#afafaf',marginTop:10, textDecoration:'italic', width:300}}>
                                Find new Add-on from Alya addons store just with click of a button.
                            </Text>
                        </View>
                    </Image>
                </View>
                <View style={{backgroundColor:'#fff', height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width,}}>
                    <Image
                        source={require('../../../assets/introScreen/4.png')}
                        style={styles.imageContainer}
                    >
                        <View style={{width: Dimensions.get('window').width, height:'50%',paddingTop:60,
                            alignItems:'center'}}>
                            <Text style={{ color:'#787878',fontSize:25, fontWeight:'500' ,}}>SetUp Add-Ons</Text>
                            <Text fontStyle={ 'italic'} style={{ textAlign:'center', color:'#afafaf',marginTop:10, textDecoration:'italic', width:300}}>
                               Your addons setting here will reflects on your Alya Smart Mirror. </Text>
                        </View>
                    </Image>
                </View>
                <View style={{backgroundColor:'#fff', height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width,}}>
                    <Image
                        source={require('../../../assets/introScreen/5.png')}
                        style={styles.imageContainer}
                    >
                        <View style={{width: Dimensions.get('window').width, height:'50%',paddingTop:60,
                            alignItems:'center'}}>
                            <Text style={{ color:'#787878',fontSize:25, fontWeight:'500' ,}}>Ready To Meet Alya</Text>
                            <Text fontStyle={ 'italic'} style={{ textAlign:'center', color:'#afafaf',marginTop:10, textDecoration:'italic', width:300}}>
                                Click done and stand in front of your Alay Smart Mirror for face recognition training process.</Text>
                        </View>
                    </Image>
                </View>
            </AppIntros>
        );


    }
}
