
import React from 'react';
import ReactNative from 'react-native';
import {Provider} from 'react-redux';
import Router from './router';
import configureStore from './store/configureStore';
import SplashScreen from 'react-native-splash-screen';
import * as Animatable from 'react-native-animatable';
/*import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';*/
const {Component} = React;
const {View} = ReactNative;

type State = {
    isLoading: boolean,
    store: any,
}

export default class Root extends Component<void, void, State> {
    state: State = {
        isLoading: true,
        store: configureStore(() => this.setState({isLoading: false})),
    };
    
    render () {

        if (this.state.isLoading) {
            return null;
        }
        else {
            setTimeout(()=>{SplashScreen.hide();},1500);
           /* return <Animatable.View animation="fadeIn" useNativeDriver delay={600} style={{
                width: '100%', alignItems: 'center',
                justifyContent: 'center',
                height: '100%', position: 'absolute'
            }}>

                <BallIndicator
                    size={15}
                    color={"#fff"}/>
            </Animatable.View>*/
        }
        return (
            <View style={{flex: 1}}>
                <Provider store={this.state.store}>
                    <Router store={this.state.store}/>
                </Provider>
            </View>
        );
    }
}