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
    }

    componentDidMount() {
        try {

           // var contextTest = new Map();


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


    async _updateRecord () {
        // this.setState({isRecordUpdating: true});
        // Hint -- can make service call and check;
        // Demo
        // this.setState({isRecordUpdating: false});
      this.setState({
            startAnimation: true,
          completeActionTraining:false
        });

      setTimeout(()=>{
          this.setState({
          completeActionTraining:true
      });
      },5000)
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
                            Please Click on the button blew and the stand in front of Alya Smart Mirror so it can recognize you, when this process is done this window will
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
