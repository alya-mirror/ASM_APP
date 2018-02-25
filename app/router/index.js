
import React from 'react';
import ReactNative from 'react-native';
import {connect} from 'react-redux';
import {Actions, Router, Scene} from 'react-native-router-flux';
import HomeContainer from '../components/Home/HomeContainer';
import LoginContainer from '../components/Auth/LoginContainer';
import SignUpContainer from '../components/Auth/SignUpContainer';
import NavigationDrawer from '../components/NavigationDrawer';
import Colors from '../utils/Colors';
import TouchButton from '../components/Core/TouchButton';
import routerStyles from './routerStyles';
import MaterialIcons from '../components/Core/MaterialIcon';
import EvilIcons from '../components/Core/EvilIcons';

const {
    PureComponent,
} = React;

const {
    Platform,
    StyleSheet,
    View
} = ReactNative;

const BAR_HEIGHT = Platform.OS === 'ios' ? 44 :56;

const styles = StyleSheet.create({
    icon: {
        color: '#222',
    },
    
    button: {
        height: BAR_HEIGHT,
        width: BAR_HEIGHT - 8,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    
    title: {
        color: '#222',
        fontFamily: 'Montserrat',
        fontSize: Platform.OS === 'ios' ? 16 :18,
    },
    
    content: {
        flex: 1,
        alignItems: Platform.OS === 'ios' ? 'center' :'flex-start',
        justifyContent: 'center',
        marginHorizontal: 8,
    },
});

const RouterContainer = connect()(Router);

// define this based on the styles/dimensions you use
const getScenceStyle = (scene) => {
    let style = {
        backgroundColor: 'transparent'
    };
    if (scene.navigationState.index !== scene.scene.index) {
        style = {
            ...style,
            opacity: 0
        }
    }
    return style;
}

export default class AppRouter extends PureComponent {
    _renderBackButton () {
        return (
            <TouchButton
                borderless
                onPress={Actions.pop}
                style={styles.iconContainer}
            >
                {Platform.OS === 'ios' ? <EvilIcons
                    name="chevron-left"
                    size={36}
                    style={routerStyles.icon}
                />
                    :<MaterialIcons
                    name="arrow-back"
                    size={24}
                    style={routerStyles.icon}
                />
                }
            </TouchButton>
        );
    }
    
    _renderNavigationDrawer () {
        return (
            <TouchButton
                borderless
                onPress={() => {Actions.get('drawer').ref.toggle();}}
            >
                <View style={routerStyles.iconContainer}>
                    <MaterialIcons
                        name="menu"
                        size={24}
                        style={routerStyles.icon}
                    />
                </View>
            </TouchButton>
        );
    }
    
    render () {
        return (
            <RouterContainer getSceneStyle={getScenceStyle}>
                <Scene
                    component={NavigationDrawer}
                    key="drawer"
                >
                    <Scene
                        duration={0}
                        hideTabBar
                        key="root"
                        leftButtonIconStyle={routerStyles.leftButtonIconStyle}
                        navigationBarStyle={routerStyles.navbar}
                        titleStyle={routerStyles.titleStyle}>
                        <Scene
                            component={LoginContainer}
                            duration={0}
                            hideNavBar
                            initial
                            isDrawerEnable={false}
                            key="login"
                            type="reset"
                        />
                        <Scene
                            component={HomeContainer}
                            duration={0}
                            isDrawerEnable
                            key="home"
                            renderBackButton={this._renderNavigationDrawer.bind(this)}
                            title="Home"
                            type="reset"
                        />
                        <Scene
                            component={SignUpContainer}
                            duration={0}
                            hideNavBar
                            isDrawerEnable={false}
                            key="signUp"
                            renderBackButton={this._renderNavigationDrawer.bind(this)}
                            title="Trending"
                            type="reset"
                        />
                    </Scene>
                </Scene>
            </RouterContainer>
        );
    }
}
