import React from 'react';
const {
    PureComponent,
    PropTypes
} = React;
import * as Animatable from 'react-native-animatable';
import {
    ScrollView, Image, StatusBar, View, Text, LayoutAnimation, Dimensions, TextInput,
    Alert, Animated, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, StyleSheet,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {styles, searchBox, SettingScreenStyles} from './styles';
import {Dropdown} from 'react-native-material-dropdown';
import Colors from '../../utils/Colors';
import {RectangularButton, Bar} from '../AnimatedButton';
const {width: WINDOW_WIDTH} = Dimensions.get('window');
import dismissKeyboard from "react-native-dismiss-keyboard";
import image_youtube from '../Home/images/youtube.png'
import image_time from '../Home/images/time.png'
import recog from '../Home/images/recog.png'
import temperature from '../Home/images/temperature.png'
import light from '../Home/images/light.png'
import voice from '../Home/images/voice.png'
import gesture from '../Home/images/gesture.png'
import image_calendar from '../Home/images/calendar.png'
import config from '../../../config.default'

type State = {
  startAnimation: boolean,
}

type Props = {
  logout: Function,
}
let positionsValues = {
  "upper left": "w3-display-topleft"
  ,
  "upper middle": "w3-display-topmiddle"
  ,
  "upper right": "w3-display-topright"
  ,
  "bottom left": "w3-display-bottomleft"
  ,
  "bottom middle": "w3-display-bottommiddle"
  ,
  "bottom right": "w3-display-bottomright"
  ,
  "left": "w3-display-left"
  ,
  "middle": "w3-display-middle"
  ,
  "right": "w3-display-right"
};

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
      heightText: '',
      colorValue: '',
      position: '',
      isYouTube: false,
      autoPlay: false,
      textHeight: '',
      sortable: false,
      longChecked: true,
      longCheckedPop: false,
      passwordErrorMessage: null,
      onCompleteFlag: 0,
      trainUserID: '',
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
    // this.getApi();

    this._fetchUserAddons();
  }

  componentWillMount() {
    if (this.props.text === 'Youtube') {
      this.setState({
        isYouTube: true
      });
    }
    else {
      this.setState({
        isYouTube: false
      });
    }
  }

  _onPress() {
    console.log('id from setting', this.props.addonID)
    this.setState({
      startAnimation: true
    });
    var ytAddonSetting =
      {
        "height": parseInt(this.state.textHeight),
        "width": parseInt(this.state.text),
        "autoPlay": this.state.autoPlay,
        "position": positionsValues[this.state.position]
      };

    var addonSetting =
      {
        "theme": this.state.colorValue,
        "width": parseInt(this.state.text),
        "position": positionsValues[this.state.position]
      };
    var bodySetting = {};
    if (this.state.isYouTube) {
      bodySetting = ytAddonSetting;
    } else {
      bodySetting = addonSetting;
    }

    this._fetchUserAddons();
    const params = {addonID: this.props.addonID};
    return fetch(`http://${config.host}:3100/api/userAddons/${encodeURIComponent(params.addonID)}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(
        {
          "addonSettings": bodySetting,
        }
      )

    })
    .then((response) => {
      console.log('save setting' + JSON.stringify(response));

    })

    .catch((error) => {
      console.log(error);

    });


  }

  _fetchUserAddons() {
    let coreAddons = [['123', 'Face Recognition', recog, ' '], ['123456', 'Gesture', gesture, ' '], ['1234', 'voice Recognition', voice, ' ']
      , ['1234567', 'Sensor Data', light, ' ']];
    global.userAddons = coreAddons;
    let userAddons = new Array();
    let approvedAddons = new Array();
    let addonName = '';
    let iconName = '';
    return fetch(`http://${config.host}:3100/api/addons/${encodeURIComponent(global.userInfo.userId)}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
    }).then((response) => response.json())
    .then((responseJson) => {
      console.log('user addons from setting ' + JSON.stringify(responseJson))
      for (let addon of responseJson.userInstalledAddons) {
        if (addon.description.toString().indexOf('clock') > -1) {
          addonName = 'Clock'
          iconName = image_time;
        }
        else if (addon.description.toString().indexOf('date/time') > -1) {
          addonName = 'Date Time'
          iconName = image_calendar;
        } else if (addon.description.toString().indexOf('youtube') > -1) {
          addonName = 'Youtube'
          iconName = image_youtube;
        }
        global.userAddons.push([addon._id, addonName, iconName, addon.npm_name, addon.userAddonId])
        addonName = ''
        iconName = '';
      }

      for (let addon of responseJson.userUninstalledAddons) {
        addonName = ''
        iconName = '';
        if (addon.description.toString().indexOf('clock') > -1) {
          addonName = 'Clock'
          iconName = image_time;
        }
        else if (addon.description.toString().indexOf('date/time') > -1) {
          addonName = 'Date Time'
          iconName = image_calendar;
        } else if (addon.description.toString().indexOf('youtube') > -1) {
          addonName = 'Youtube'
          iconName = image_youtube;
        }
        approvedAddons.push([addon._id, addonName, iconName, addon.npm_name])

      }
      // global.userAddons= userAddons;
      global.approvedAddons = approvedAddons;
      setTimeout(() => {
        this.setState({
          completeActionTraining: true,
        });
      }, 8000);

    })

    .catch((error) => {
      console.log(error);

    });
  }

  _onPressComplete() {
    this.setState({longChecked: true});
    this.setState({longCheckedPop: false});
    this._onPressManagementButton();
  }

  getApi() {
    const params = {addonName: this.props.addonName};
    console.log('addonName is ', params.addonName);
    return fetch(`http://${config.host}:3100/api/addonsConfigurationSchema/:${encodeURIComponent(params.addonName)}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },

    })
    .then((response) => {
      console.log('unInstall' + JSON.stringify(response));
      console.log('response data ', JSON.stringify(response));
    })

    .catch((error) => {
      console.log(error);

    });

  }

  _onAnimationComplete() {
    Actions.home();


  }


  render() {
    console.log('isAdon', this.state.isYouTube, this.props.text);
    let data = [{
      value: 'dark',
    }, {
      value: 'light',
    }, {
      value: 'aqua',
    }, {
      value: 'lime',
    }, {
      value: 'sherbert',
    }, {
      value: 'navy',
    }];
    let positions = [{
      value: 'upper left',
    }, {
      value: 'upper middle',
    }, {
      value: 'upper right',
    }, {
      value: 'left',
    }, {
      value: 'middle',
    }, {
      value: 'right',
    },
      {
        value: 'bottom left',
      }, {
        value: 'bottom middle',
      }, {
        value: 'bottom right',
      }];

    let BoolData = [{
      value: 'true',
    }, {
      value: 'false',
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
          <View style={{width: "100%", height: 100, alignItems: 'center', justifyContent: 'center',}}>
            <Text style={{fontWeight: 'bold', marginTop: 80, color: Colors.primary, fontSize: 20}}>Addons
              Setting</Text>
            <Image source={this.props.ImageName}
                   style={{width: 60, height: 60, marginHorizontal: 10, marginBottom: 5, marginTop: 15}}/>
          </View>

          <View style={{
            width: "80%",
            height: 50,
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingLeft: 20,
            marginTop: 80,
          }}>
            <Text style={{
              fontWeight: 'bold',
              marginTop: 10,
              color: Colors.primary,
              fontSize: 15
            }}>AddonName: {this.props.text}</Text>
          </View>
          <View>
            {this.state.isYouTube === true ? (
                <View>
                  <View style={{
                    width: "80%",
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingLeft: 20,
                    flexDirection: 'row'
                  }}>
                    <Text style={{fontWeight: 'bold', marginTop: 10, color: Colors.primary, fontSize: 15}}>Width: </Text>
                    <TextInput style={{height: 40, width: 200}} placeholder="Set Addon Width"
                               onChangeText={(text) => this.setState({text})}/>
                  </View>
                  <View style={{
                    width: "80%",
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingLeft: 20,
                    flexDirection: 'row'
                  }}>
                    <Text style={{fontWeight: 'bold', marginTop: 10, color: Colors.primary, fontSize: 15}}>Height: </Text>
                    <TextInput style={{height: 40, width: 200}} placeholder="Set Addon Width"
                               onChangeText={(textHeight) => this.setState({textHeight})}/>
                  </View>
                  <View style={{
                    width: "100%",
                    height: 50,
                    flexDirection: 'row',
                    paddingLeft: 20,
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start'
                  }}>
                    <Text style={{
                      fontWeight: 'bold',
                      marginTop: 10,
                      color: Colors.primary,
                      fontSize: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      Color: </Text>
                    <Dropdown containerStyle={{width: 200}}
                              label='Available Colors'
                              data={BoolData}
                              value={this.state.autoPlay}
                              onChangeText={(autoPlay) => this.setState({autoPlay})}
                    />
                  </View>
                </View>
              ) :
              (
                <View>
                  <View style={{
                    width: "80%",
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingLeft: 20,
                    flexDirection: 'row'
                  }}>
                    <Text
                      style={{fontWeight: 'bold', marginTop: 10, color: Colors.primary, fontSize: 15}}>Width: </Text>
                    <TextInput style={{height: 40, width: 200}} placeholder="Set Addon Width"
                               onChangeText={(text) => this.setState({text})}/>
                  </View>
                  <View style={{
                    width: "100%", height: 50, flexDirection: 'row', paddingLeft: 20,
                    alignItems: 'flex-end', justifyContent: 'flex-start'
                  }}>
                    <Text style={{
                      fontWeight: 'bold',
                      marginTop: 1,
                      color: Colors.primary,
                      fontSize: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>Color: </Text>
                    <View>
                      <Dropdown containerStyle={{width: 200}}
                                label='Available Colors'
                                data={data}
                                value={this.state.colorValue}
                                onChangeText={(colorValue) => this.setState({colorValue})}
                      />
                    </View>
                  </View>
                </View>
              )}
            <View style={{
              width: "100%", height: 50, flexDirection: 'row', paddingLeft: 20,
              alignItems: 'flex-end', justifyContent: 'flex-start'
            }}>
              <Text style={{
                fontWeight: 'bold',
                marginTop: 1,
                color: Colors.primary,
                fontSize: 15,
                alignItems: 'center',
                justifyContent: 'center',
              }}>Positions: </Text>
              <View>
                <Dropdown containerStyle={{width: 200}}
                          label='positions'
                          data={positions}
                          value={this.state.position}
                          onChangeText={(position) => this.setState({position})}
                />
              </View>
            </View>
          </View>
          <View style={{
            width: "100%",
            height: 100,
            paddingLeft: 0,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '30%'
          }}>
            <RectangularButton
              duration={1000}
              fontColor="#FFF"
              formCircle={true}
              onComplete={this._onAnimationComplete.bind(this)}
              onPress={this._onPress.bind(this)}
              spinner={isRecordUpdating}
              startAnimation={startAnimation}
              text="Submit"
              width={WINDOW_WIDTH - 200}
            />
          </View>
        </View>

      </View>
    );


  }
}
