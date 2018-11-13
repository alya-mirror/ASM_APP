import React, {
    Component,
} from 'react';
import {
    StyleSheet,
    View, NetInfo, Text,
    AsyncStorage, Image,
    StatusBar, TouchableOpacity,
    Animated, BackAndroid, Platform,
    InteractionManager, Alert, ToastAndroid, BackHandler,
} from 'react-native';
import {
    Actions
} from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';
import Draggable from './components/Draggable';
import config from '../../../config.default.json'

let addonsLocalPosition = [{x: 10, y: 30, position: 'w3-display-topleft',},
    {x: 123, y: 30, position: 'w3-display-topmiddle'}, {x: 230, y: 30, position: 'w3-display-topright'},
    {x: 10, y: 150, position: 'w3-display-left'}, {x: 123, y: 150, position: 'w3-display-middle'},
    {x: 230, y: 150, position: 'w3-display-right'}, {x: 10, y: 270, position: 'w3-display-bottomleft'},
    {x: 123, y: 270, position: 'w3-display-bottommiddle'}, {x: 230, y: 270, position: 'w3-display-bottomright'}];


export default class MirrorScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // signInHandler: null,
            isConnected: null,
            indicatorIs: false,
            ConnectStates: null,
            isLoggingIn: true,
            releaseItems: true,
            randoms: 0,
            isTuh: false,
            buttonName: 'Edit',
            message: '',
            animation: {
                headerPositionTop: new Animated.Value(-148),
                formPositionLeft: new Animated.Value(614),
                formPositionBottom: new Animated.Value(614),
                passwordPositionLeft: new Animated.Value(905),
                buttonPositionTop: new Animated.Value(1354),
                animateOpacity: new Animated.Value(0),
                animateOpacityLogo: new Animated.Value(0),
                animatedWidth: new Animated.Value(0),
                animatedHeight: new Animated.Value(0),
                logoPositionTop: new Animated.Value(-228),

            },

        };
    }


    animateHome() {
        var contextTest = new Map();
        Animated.timing(this.state.animation.headerPositionTop, {
            toValue: 0,
            duration: 725,
            delay: 100
        }).start();
        Animated.timing(this.state.animation.formPositionLeft, {
            toValue: 0,
            duration: 700,
            delay: 120
        }).start();
        Animated.timing(this.state.animation.formPositionBottom, {
            toValue: 0,
            duration: 700,
            delay: 120
        }).start();
        Animated.timing(this.state.animation.passwordPositionLeft, {
            toValue: 0,
            duration: 700,
            delay: 120
        }).start();
        Animated.timing(this.state.animation.buttonPositionTop, {
            toValue: 0,
            duration: 600,
            delay: 130
        }).start();
        Animated.timing(this.state.animation.animateOpacity, {
            toValue: 0.3,
            duration: 300,
            delay: 10
        }).start();
        Animated.timing(this.state.animation.animatedHeight, {
            toValue: 50,
            duration: 300,
            delay: 10
        }).start();
        Animated.timing(this.state.animation.animatedWidth, {
            toValue: 60,
            duration: 300,
            delay: 10
        }).start();
        Animated.timing(this.state.animation.animateOpacityLogo, {
            toValue: 1,
            duration: 1500,
            delay: 10
        }).start();
        Animated.timing(this.state.animation.logoPositionTop, {
            toValue: 0,
            duration: 700,
            delay: 10
        }).start();
    }

    unmountComponent(callback) {
        try {
            const timing = Animated.timing;
            Animated.parallel([
                timing(this.state.animation.headerPositionTop, {
                    toValue: -148,
                    duration: 400,
                    delay: 100
                }),
                timing(this.state.animation.formPositionLeft, {
                    toValue: 614,
                    duration: 500,
                    delay: 120
                }),
                timing(this.state.animation.passwordPositionLeft, {
                    toValue: 0,
                    duration: 900
                }),
                timing(this.state.animation.buttonPositionTop, {
                    toValue: 1354,
                    duration: 400,
                    delay: 130
                }),
                timing(this.state.animation.animateOpacityLogo, {
                    toValue: 0,
                    duration: 400,
                    delay: 130
                }),
                timing(this.state.animation.animateOpacity, {
                    toValue: 0,
                    duration: 400,
                    delay: 130
                })
            ]).start(callback);
        } catch (error) {
            console.log("Error in:", error);
        }
    }

    componentWillMount() {
        try {

            /*   navigator.geolocation.getCurrentPosition(
                   (position) => {
                       console.log('LOCATION####',position.coords.latitude,position.coords.longitude,);
                       console.log('LOCATIONSSSS',position);
                       global.userLocation = position.coords;
                       // global.driverCurrentLocation = position.coords;
                   },
                   (error) => this.setState({ error: error.message }),
                   { enableHighAccuracy: true,  timeout: 20000,
                       maximumAge: 1000, distanceFilter:50, useSignificantChanges: true},
               );
   */


        } catch (error) {

            console.log("Error in:", error);
        }

    }


    componentDidMount() {
        this.setState({releaseItems: true});
    }

    redirection = () => {
        setTimeout(() => {
            Actions.login();
        }, 2000)
    };

    generateAppList() { //label={x} key={i} value={x}
        console.log("Error in:", this.props.userInstalledAddons);
        let finallArrayPostion = [];
        let userInstalledAdons = this.props.userInstalledAddons;

        for (let addon of userInstalledAdons) {
            for (let localPostion of addonsLocalPosition) {
                if (addon.coreSettings.position === localPostion.position) {
                    console.log(addon.addonName);
                    switch (addon.addonName) {
                        case "asmDateTime":
                            finallArrayPostion.push(
                                {
                                    _id: addon._id,
                                    userId: addon.userId,
                                    addonId: addon.addonId,
                                    addonName: addon.addonName,
                                    imageSource: require('../Home/images/calendar.png'),
                                    coreSettings: {
                                        position: addon.coreSettings.position,
                                        x: localPostion.x,
                                        y: localPostion.y,
                                        renderSize: 55,
                                    },
                                });
                            break;

                        case 'ASManalogClock':
                            finallArrayPostion.push(
                                {
                                    _id: addon._id,
                                    userId: addon.userId,
                                    addonId: addon.addonId,
                                    addonName: addon.addonName,
                                    imageSource: require('../Home/images/time.png'),
                                    coreSettings: {
                                        position: addon.coreSettings.position,
                                        x: localPostion.x,
                                        y: localPostion.y,
                                        renderSize: 55,
                                    },
                                });
                            break;
                        case 'ASMyoutube':
                            finallArrayPostion.push(
                                {
                                    _id: addon._id,
                                    userId: addon.userId,
                                    addonId: addon.addonId,
                                    addonName: addon.addonName,
                                    imageSource: require('../Home/images/youtube.png'),
                                    coreSettings: {
                                        position: addon.coreSettings.position,
                                        x: localPostion.x,
                                        y: localPostion.y,
                                        renderSize: 55,
                                    },
                                });
                            break;
                        default:
                            console.log('Sorry, we are out of options');

                    }
                }
            }
        }
        console.log("Error in:", finallArrayPostion);


        const userGender = [{x: 10, y: 30, renderSize: 55, imageSource: require('../Home/images/calendar.png')},
            {x: 123, y: 30, renderSize: 55, imageSource: require('../Home/images/youtube.png')},
            {x: 230, y: 30, renderSize: 55, imageSource: require('../Home/images/time.png')},

            {x: 10, y: 150, renderSize: 55, imageSource: require('../Home/images/gesture.png')},
            {x: 123, y: 150, renderSize: 55, imageSource: require('../Home/images/locked.png')},
            {x: 230, y: 150, renderSize: 55, imageSource: require('../Home/images/credit.png')},

            {x: 10, y: 270, renderSize: 55, imageSource: require('../Home/images/cash.png')},
            {x: 123, y: 270, renderSize: 55, imageSource: require('../Home/images/cart.png')},
            {x: 230, y: 270, renderSize: 55, imageSource: require('../Home/images/transfer.png')}];

        let user_Type = null;
        console.log("releaseItems0", this.state.releaseItems)
        user_Type = finallArrayPostion.map((item, y,) => {
            return <Draggable renderSize={item.coreSettings.renderSize} renderShape='image'
                              x={item.coreSettings.x}
                              y={item.coreSettings.y}
                              key={y}
                              imageSource={item.imageSource}
                              dataSource={item}
                              longPressDrag={() => {
                                  this.longPressActionHandler(item.imageSource)
                              }}
                              pressOutDrag={() => {
                                  console.log("pressOutDrag", this.state.isLoggingIn)
                              }}
                              reverse={this.state.releaseItems}
                              windowHeight={350}
                              windowWidth={300}
                              pressDragRelease={(e, gestureState, itemPositionX, itemPositionY, dataSource) => {
                                  this.pressDragReleaseHandler(itemPositionX, itemPositionY, dataSource)
                              }}
                              renderText='A'/>
        });

        return user_Type;
    }

    longPressActionHandler(name) {
        console.log("NAme", name)
        // this.setState({isLoggingIn:!this.state.isLoggingIn})
    }

    pressDragReleaseHandler(itemPositionX, itemPositionY, dataSource) {
        console.log("NAme", itemPositionX, itemPositionY, dataSource);
        if (itemPositionX > 0.00 && itemPositionX <= 50.00 && itemPositionY > 0.00 && itemPositionY <= 93.00) {

            this.onDragChangeItemLocation("w3-display-topleft", itemPositionX, itemPositionY, dataSource)
        } else if (itemPositionX > 93.00 && itemPositionX <= 140.00 && itemPositionY > 0.00 && itemPositionY <= 93.00) {

            this.onDragChangeItemLocation("w3-display-topmiddle", itemPositionX, itemPositionY, dataSource)
        } else if (itemPositionX > 180.00 && itemPositionX <= 245.00 && itemPositionY > 0.00 && itemPositionY <= 93.00) {

            this.onDragChangeItemLocation("w3-display-topright", itemPositionX, itemPositionY, dataSource)
        } else if (itemPositionX > 0.00 && itemPositionX <= 50.00 && itemPositionY > 110.00 && itemPositionY <= 167.00) {

            this.onDragChangeItemLocation("w3-display-left", itemPositionX, itemPositionY, dataSource)
        } else if (itemPositionX > 93.00 && itemPositionX <= 140.00 && itemPositionY > 110.00 && itemPositionY <= 167.00) {

            this.onDragChangeItemLocation("w3-display-middle", itemPositionX, itemPositionY, dataSource)
        } else if (itemPositionX > 180.00 && itemPositionX <= 245.00 && itemPositionY > 110.00 && itemPositionY <= 167.00) {

            this.onDragChangeItemLocation("w3-display-right", itemPositionX, itemPositionY, dataSource)
        } else if (itemPositionX > 0.00 && itemPositionX <= 50.00 && itemPositionY > 222.00 && itemPositionY <= 306.00) {

            this.onDragChangeItemLocation("w3-display-bottomleft", itemPositionX, itemPositionY, dataSource)
        } else if (itemPositionX > 93.00 && itemPositionX <= 140.00 && itemPositionY > 222.00 && itemPositionY <= 306.00) {

            this.onDragChangeItemLocation("w3-display-bottommiddle", itemPositionX, itemPositionY, dataSource)
        } else if (itemPositionX > 180.00 && itemPositionX <= 245.00 && itemPositionY > 222.00 && itemPositionY <= 306.00) {

            this.onDragChangeItemLocation("w3-display-bottomright", itemPositionX, itemPositionY, dataSource)
        }

    }

    submitNewConfig(coreSettingsPosition, OldCoreSettingsPosition, addonID) {
        console.log("XXX", coreSettingsPosition, OldCoreSettingsPosition, addonID,
            JSON.stringify(
                {
                    coreSettings: {
                        position: coreSettingsPosition
                    },
                    oldCoreSettings: {
                        position: OldCoreSettingsPosition
                    }
                }
            ));
        if (this.state.releaseItems === false) {
            return fetch('http://' + config.host + ':3100/api/userAddons/coreSettings/' + addonID, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        coreSettings: {
                            position: coreSettingsPosition
                        },
                        oldCoreSettings: {
                            position: OldCoreSettingsPosition
                        }
                    }
                )
            })
                .then((response) => {
                    console.log('Response userAddons ', JSON.stringify(response));
                })

                .catch((error) => {
                    console.log("error", error);
                });
        } else {
            console.log("Not Released", coreSettingsPosition, OldCoreSettingsPosition, addonID);
        }
    }

    onDragChangeItemLocation(ITEMPOSITIONNAME, itemPositionX, itemPositionY, dataSource) {
        console.log("LOCATION ", ITEMPOSITIONNAME);
        let userAddons = this.props.userAddonsOrginal;

        switch (ITEMPOSITIONNAME) {
            case 'w3-display-topleft':
                for (let addon of userAddons) {
                    if (addon._id === dataSource._id) {
                        this.submitNewConfig(ITEMPOSITIONNAME, dataSource.coreSettings.position, dataSource._id)
                    }
                }
                break;
            case 'w3-display-topmiddle':
                for (let addon of userAddons) {
                    if (addon._id === dataSource._id) {
                        this.submitNewConfig(ITEMPOSITIONNAME, dataSource.coreSettings.position, dataSource._id)
                    }
                }
                break;
            case 'w3-display-topright':
                for (let addon of userAddons) {
                    if (addon._id === dataSource._id) {
                        this.submitNewConfig(ITEMPOSITIONNAME, dataSource.coreSettings.position, dataSource._id)
                    }
                }
                break;
            case 'w3-display-left':
                for (let addon of userAddons) {
                    if (addon._id === dataSource._id) {
                        this.submitNewConfig(ITEMPOSITIONNAME, dataSource.coreSettings.position, dataSource._id)
                    }
                }
                break;
            case 'w3-display-middle':
                for (let addon of userAddons) {
                    if (addon._id === dataSource._id) {
                        this.submitNewConfig(ITEMPOSITIONNAME, dataSource.coreSettings.position, dataSource._id)
                    }
                }
                break;
            case 'w3-display-right':
                for (let addon of userAddons) {
                    if (addon._id === dataSource._id) {
                        this.submitNewConfig(ITEMPOSITIONNAME, dataSource.coreSettings.position, dataSource._id)
                    }
                }
                break;
            case 'w3-display-bottomleft':
                for (let addon of userAddons) {
                    if (addon._id === dataSource._id) {
                        this.submitNewConfig(ITEMPOSITIONNAME, dataSource.coreSettings.position, dataSource._id)
                    }
                }
                break;
            case 'w3-display-bottommiddle':
                for (let addon of userAddons) {
                    if (addon._id === dataSource._id) {
                        this.submitNewConfig(ITEMPOSITIONNAME, dataSource.coreSettings.position, dataSource.addonId)
                    }
                }
                break;
            case 'w3-display-bottomright':
                for (let addon of userAddons) {
                    if (addon._id === dataSource._id) {
                        this.submitNewConfig(ITEMPOSITIONNAME, dataSource.coreSettings.position, dataSource._id)
                    }
                }
                break;

        }
    }

    render() {
        const {isLoggingIn, releaseItems, randoms} = this.state;
        try {
            return (
                <View style={MirrorScreenStyle.homeContainer}>


                    <View key={randoms}
                          style={{width: 300, height: 350, backgroundColor: '#eeeeee', borderColor: '#909090',}}>
                        <View style={{width: 300, height: 350, justifyContent: 'space-between', opacity: 0.7}}>
                            <View style={{
                                width: 300,
                                height: 116,
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{
                                    width: 99,
                                    height: 115,
                                    backgroundColor: 'transparent',
                                    borderColor: '#909090',
                                    borderWidth: 1
                                }}/>
                                <View style={{
                                    width: 99,
                                    height: 115,
                                    backgroundColor: 'transparent',
                                    borderColor: '#909090',
                                    borderWidth: 1
                                }}/>
                                <View style={{
                                    width: 99,
                                    height: 115,
                                    backgroundColor: 'transparent',
                                    borderColor: '#909090',
                                    borderWidth: 1
                                }}/>
                            </View>
                            <View style={{
                                width: 300,
                                height: 116,
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{
                                    width: 99,
                                    height: 115,
                                    backgroundColor: 'transparent',
                                    borderColor: '#909090',
                                    borderWidth: 1
                                }}/>
                                <View style={{
                                    width: 99,
                                    height: 115,
                                    backgroundColor: 'transparent',
                                    borderColor: '#909090',
                                    borderWidth: 1
                                }}/>
                                <View style={{
                                    width: 99,
                                    height: 115,
                                    backgroundColor: 'transparent',
                                    borderColor: '#909090',
                                    borderWidth: 1
                                }}/>
                            </View>
                            <View style={{
                                width: 300,
                                height: 116,
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{
                                    width: 99,
                                    height: 115,
                                    backgroundColor: 'transparent',
                                    borderColor: '#909090',
                                    borderWidth: 1
                                }}/>
                                <View style={{
                                    width: 99,
                                    height: 115,
                                    backgroundColor: 'transparent',
                                    borderColor: '#909090',
                                    borderWidth: 1
                                }}/>
                                <View style={{
                                    width: 99,
                                    height: 115,
                                    backgroundColor: 'transparent',
                                    borderColor: '#909090',
                                    borderWidth: 1
                                }}/>
                            </View></View>
                        {this.generateAppList()}
                    </View>

                    <View style={{position: 'absolute', top: 60, left: 31,}}><Text
                        style={{fontSize: 16, fontWeight: '500'}}>
                        Addons Positions
                    </Text>
                        <Text style={{fontSize: 11, fontWeight: '400', width: 330}}>
                            Change your installed addons position on Alaya Mirror by moving it to the
                            available positions.
                        </Text></View>

                    {releaseItems === true ? (
                        <View style={{position: 'absolute', bottom: 60, left: 105, width: 100, height: 30,}}>
                            <TouchableOpacity style={{
                                width: 150,
                                height: 30,
                                backgroundColor: "#8d3155",
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                                              onPress={() => {
                                                  this.setState({
                                                      releaseItems: false,
                                                      randoms: Math.random(),
                                                      buttonName: 'Submit'
                                                  });

                                                  this.forceUpdate()
                                              }}>
                                <Text style={{fontSize: 16, fontWeight: '500', color: '#fff'}}>
                                    {this.state.buttonName}
                                </Text></TouchableOpacity>
                        </View>
                    ) : (<View style={{position: 'absolute', bottom: 60, left: 105, width: 100, height: 30,}}>
                        <TouchableOpacity style={{
                            width: 150,
                            height: 30,
                            backgroundColor: "#8d3155",
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                                          onPress={() => {
                                              this.setState({
                                               //   releaseItems: true,
                                                  buttonName: 'Edit',
                                                //  randoms: Math.random()
                                              });
                                              setTimeout(()=>{Actions.home();
                                                  this.setState({
                                                      releaseItems: true,
                                                      //buttonName: 'Edit',
                                                      randoms: Math.random()
                                                  });},100);
                                              this.forceUpdate()
                                          }}>
                            <Text style={{fontSize: 16, fontWeight: '500', color: '#fff'}}>
                                {this.state.buttonName}
                            </Text></TouchableOpacity>
                    </View>)}

           {/*         {this.state.buttonName === 'Verify' ? (
                        <View style={{position: 'absolute', bottom: 60, right: 31,}}>
                            <TouchableOpacity style={{
                                width: 100,
                                height: 30,
                                backgroundColor: "#8d3155",
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                                              onPress={() => {
                                                  Actions.home();
                                              }}>
                                <Text style={{fontSize: 16, fontWeight: '500', color: '#fff'}}>
                                    Submit
                                </Text></TouchableOpacity>
                        </View>
                    ) : null}*/}

                </View>
            );
        } catch (error) {
            console.log("Error in:", error);
        }
    }
}
const MirrorScreenStyle = StyleSheet.create({
    homeContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        alignItems: 'center',
        padding: '2%',
        paddingTop: '4%',
        justifyContent: 'center',
    },
    images:
        {
            //marginTop: '-5%',
            width: '100%',
            height: '100%',

        },
    animatedContainer: {

        alignItems: 'center',
        justifyContent: 'center', flex: 1, width: '100%', height: '100%',
    }

});
