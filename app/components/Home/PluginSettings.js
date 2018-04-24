import React from 'react';
const {
    PureComponent,
    PropTypes
} = React;
import * as Animatable from 'react-native-animatable';
import {ScrollView, Image, StatusBar, View, Text, LayoutAnimation, Dimensions,TextInput,
    Alert, Animated,TouchableOpacity,TouchableHighlight,TouchableWithoutFeedback,StyleSheet,} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {styles, searchBox, SettingScreenStyles} from './styles';
import { Dropdown } from 'react-native-material-dropdown';
import Colors from '../../utils/Colors';
import {RectangularButton, Bar} from '../AnimatedButton';
const {width: WINDOW_WIDTH} = Dimensions.get('window');
import dismissKeyboard from "react-native-dismiss-keyboard";
type State = {
    startAnimation: boolean,
}

type Props = {
    logout: Function,
}


export default class PluginSettings extends PureComponent<void, Props, State> {
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
            text: '',
            sortable: false,
            longChecked: true,
            longCheckedPop:false,
            passwordErrorMessage: null,
            onCompleteFlag:0,
            trainUserID:'',
            startAnimationSignUp: false,
            isRecordUpdating: false,
            hideWelcomeMessage: false,
            opacity: new Animated.Value(0),
            animated: {
                fromPositiontop: new Animated.Value(0),
            },
        };
        this._sortableSudokuGrid = null
    }

    componentDidMount() {
        this.getApi();
    }

    _onPress () {
       this.setState({
            startAnimation: true
        });
         }
    _onPressComplete () {
        this.setState({longChecked:true});
        this.setState({longCheckedPop:false});
        this._onPressManagementButton();
    }
    getApi()
    {
        const params = {addonName: this.props.addonName};
        console.log('addonName is ' , params.addonName );
        return fetch(`http://192.168.0.10:3100/api/addonsConfigurationSchema/:${encodeURIComponent(params.addonName)}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },

        })
            .then((response) => {
                console.log('unInstall' +  JSON.stringify(response));
                console.log('response data ' , JSON.stringify(response));
            })

            .catch((error) => {
                console.log(error);

            });

    }
    _onAnimationComplete () {
    Actions.home();


    }


    render() {
        let data = [{
            value: 'Red',
        }, {
            value: 'Blue',
        }, {
            value: 'Green',
        }];
        const {
            startAnimation,
            startAnimationSignUp,
            isRecordUpdating,
            hideWelcomeMessage
        } = this.state;
        return (
            <View style={SettingScreenStyles.homeContainer}>
                <View style={SettingScreenStyles.homeComponentHolder}>
                    <View style={{width:"100%", height:100, alignItems:'center',justifyContent:'center',}}>
                        <Text style={{fontWeight: 'bold', marginTop: 80, color:Colors.primary, fontSize:20}}>Addons Setting</Text>
                        <Image source={this.props.ImageName}
                               style={{width: 60, height: 60, marginHorizontal: 10, marginBottom: 5, marginTop:15}}/>
                    </View>

                    <View style={{width:"80%", height:50, alignItems:'flex-start',justifyContent:'center',paddingLeft:20, marginTop: 80,}}>
                        <Text style={{fontWeight: 'bold', marginTop: 10, color:Colors.primary, fontSize:15}}>Addon Name: {this.props.text}</Text>
                    </View>

                    <View style={{width:"80%", height:50, alignItems:'center',justifyContent:'flex-start',paddingLeft:20, flexDirection:'row'}}>
                        <Text style={{fontWeight: 'bold', marginTop: 10, color:Colors.primary, fontSize:15}}>Width: </Text>
                        <TextInput
                            style={{height: 40, width:200}}
                            placeholder="Set Addon Width"
                            onChangeText={(text) => this.setState({text})}
                        />
                    </View>

                    <View style={{width:"100%", height:50, flexDirection:'row', paddingLeft:20,alignItems:'flex-end',justifyContent:'flex-start' }}>
                         <Text style={{fontWeight: 'bold', marginTop: 10, color:Colors.primary, fontSize:15, alignItems:'center',justifyContent:'center', }}>Color:  </Text>
                          <Dropdown containerStyle={{width:200}}
                            label='Available Colors'
                            data={data}
                        />
                    </View>
                    <View  style={{width:"100%", height:100,   paddingLeft:0,alignItems:'center',justifyContent:'center', marginTop:'30%'}}>
                        <RectangularButton
                            duration={1000}
                            fontColor="#FFF"
                            formCircle={true}
                            onComplete={this._onAnimationComplete.bind(this)}
                            onPress={this._onPress.bind(this)}
                            spinner={isRecordUpdating}
                            startAnimation={startAnimation}
                            text="Submit"
                            width={WINDOW_WIDTH-200}
                        />
                    </View>
                </View>

            </View>
        );


    }
}
