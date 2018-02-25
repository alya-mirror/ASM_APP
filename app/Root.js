
import React from 'react';
import ReactNative from 'react-native';
import {Provider} from 'react-redux';
import Router from './router';
import configureStore from './store/configureStore';
import SplashScreen from 'react-native-splash-screen';

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
            SplashScreen.hide();
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