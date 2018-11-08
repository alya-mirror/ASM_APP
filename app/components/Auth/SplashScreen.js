import React, {
    Component,
} from 'react';
import {
    StyleSheet,
    View, NetInfo,
    AsyncStorage, Image,
    StatusBar,
    Animated, BackAndroid, Platform,
    InteractionManager, Alert, ToastAndroid, BackHandler,
} from 'react-native';
import {
    Actions
} from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';
import MirrorScreen from "../MirrorScreen/MirrorScreen";


export default class SplashScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // signInHandler: null,
            isConnected: null,
            indicatorIs: false,
            ConnectStates: null,
            isLoggingIn: false,
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

    }

    redirection = () =>
    {
      setTimeout(()=>{
          Actions.MirrorScreen();
      },5000)
    };
    render() {
        try {
            return (
               <View>
                   <Image resizeMode={'center'} style={splashScreenStyle.images}
                       source={Platform.OS === 'ios' ? require('../../../assets/splash.png') : require('../../../assets/splash.png')} />
                   {this.redirection()}
               </View>);
        } catch (error) {
            console.log("Error in:", error);
        }
    }
}
const splashScreenStyle = StyleSheet.create({
    homeContainer: {
        flex: 3,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    images:
        {
            //marginTop: '-5%',
            width: '100%',
            height: '100%',
            resizeMode:'cover'

        },
    animatedContainer: {

        alignItems: 'center',
        justifyContent: 'center', flex: 1, width: '100%', height: '100%',
    }

});
