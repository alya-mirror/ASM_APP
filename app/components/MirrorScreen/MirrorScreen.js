

import React, {
    Component,
} from 'react';
import {
    StyleSheet,
    View, NetInfo,Text,
    AsyncStorage, Image,
    StatusBar,TouchableOpacity,
    Animated, BackAndroid, Platform,
    InteractionManager, Alert, ToastAndroid, BackHandler,
} from 'react-native';
import {
    Actions
} from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';
import Draggable from './components/Draggable';


export default class MirrorScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // signInHandler: null,
            isConnected: null,
            indicatorIs: false,
            ConnectStates: null,
            isLoggingIn: true,
            isTuh:false,
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
          Actions.login();
      },2000)
    };

    generateAppList()
    { //label={x} key={i} value={x}
        console.log("Error in:");
        const userGender = [{x:10, y:30,renderSize:55, imageSource:require('../Home/images/calendar.png')},
            {x:123, y:30,renderSize:55, imageSource:require('../Home/images/youtube.png')},
            {x:240, y:30,renderSize:55, imageSource:require('../Home/images/time.png')}];
        let user_Type = userGender.map((item,y,)=> {
            return <Draggable renderSize={item.renderSize} renderShape='image'
                              x={item.x}
                              y={item.y}
                              imageSource={ item.imageSource}
                              longPressDrag={()=>{this.setState({isLoggingIn:!this.state.isLoggingIn})}}
                              pressOutDrag={()=>{console.log("pressOutDrag", this.state.isLoggingIn)}}
                              reverse={this.state.isLoggingIn}
                              windowHeight={350}
                              windowWidth={300}
                              pressDragRelease={()=>{console.log("pressDragRelease", this.state.isLoggingIn)}}
                              renderText='A' />
        });
        return user_Type;
    }
    render() {
        const {isLoggingIn} = this.state;
        try {
            return (
                <View style={MirrorScreenStyle.homeContainer}>
                    <View style={{width:300, height:350, backgroundColor:'#d3d3d3'}}>
                       {/* <Draggable renderSize={55} renderShape='image'
                                    x={245}
                                    y={1}
                                   imageSource={require('../Home/images/calendar.png')}
                                   longPressDrag={()=>{this.setState({isLoggingIn:!this.state.isLoggingIn})}}
                                   pressOutDrag={()=>{console.log("pressOutDrag", this.state.isLoggingIn)}}
                                   reverse={this.state.isLoggingIn}
                                   windowHeight={350}
                                   windowWidth={300}
                                 //  offsetX={30}
                                   // offsetY={30}
                                   pressDragRelease={()=>{console.log("pressDragRelease", this.state.isLoggingIn)}}
                                    renderText='A' />*/}
                                    <View style={{width:300, height:350,   justifyContent:'space-between', opacity:0.7}}>
                        <View style={{width:300, height:116, flexDirection:'row', justifyContent:'space-between'}}>
                            <View style={{width:99, height:115 , backgroundColor:'#fff9a2', }}/>
                            <View style={{width:99, height:115 , backgroundColor:'#faff65'}}/>
                            <View style={{width:99, height:115 , backgroundColor:'#83ffac'}}/>
                        </View>
                        <View style={{width:300, height:116, flexDirection:'row', justifyContent:'space-between'}}>
                            <View style={{width:99, height:115 , backgroundColor:'#81f7ff'}}/>
                            <View style={{width:99, height:115 , backgroundColor:'#faff65'}}/>
                            <View style={{width:99, height:115 , backgroundColor:'#e7ff9f'}}/>
                        </View>
                        <View style={{width:300, height:116, flexDirection:'row', justifyContent:'space-between'}}>
                            <View style={{width:99, height:115 , backgroundColor:'#78ffc5'}}/>
                            <View style={{width:99, height:115 , backgroundColor:'#faff65'}}/>
                            <View style={{width:99, height:115 , backgroundColor:'#ffe5b0'}}/>
                        </View></View>
                        {this.generateAppList()}
                    {/*  <Draggable
                                   renderShape='image'
                                   renderSize={55}
                                   x={47}
                                   y={199}
                                   windowHeight={350}
                                   windowWidth={300}
                                   reverse={false}
                                   longPressDrag={()=>{console.log("LONG", this.state.isLoggingIn)}}
                                   imageSource={require('../Home/images/calendar.png')}
                                   pressOutDrag={()=>{console.log("pressOutDrag", this.state.isLoggingIn)}}
                                   pressDragRelease={()=>{console.log("pressDragRelease", this.state.isLoggingIn)}}
                                   renderText />
                        <Draggable renderShape='image'
                                   x={2} y={2}
                                   renderSize={55}
                                   reverse={this}
                                   windowHeight={350}
                                   windowWidth={300}
                                   pressDragRelease={()=>{console.log("pressDragRelease", this.state.isLoggingIn)}}
                                   pressOutDrag={()=>{console.log("LONG", this.state.isLoggingIn)}}
                                   longPressDrag={()=>{console.log("pressOutDrag", this.state.isLoggingIn)}}
                                   imageSource={require('../Home/images/calendar.png')}/>*/}
                    </View>
                </View>
            );     } catch (error) {
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
        padding:'2%',
        paddingTop:'4%',
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
