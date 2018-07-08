
import React from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import {User} from '../../types';
import Section from './Section';
import routes from '../../router/routes';
import Profile from './Profile';
import styles from './styles';

const {
    PureComponent,
    PropTypes
} = React;

const {
    Image,
    View
} = ReactNative;

type Props = {
    user: User
}

type State = {
    route: any
}

export default class Menu extends PureComponent<void, Props, State> {
    static contextTypes = {
        drawer: PropTypes.object.isRequired
    };
    
    static propTypes = {
        user: PropTypes.any
    };
    
    state:State = {
        route: null
    };
    
    _changeScene = (path:String, routerPath: string) => {
        const {drawer} = this.context;
        drawer.closeDrawer();
        this.setState({
            route: path
        });
        return Actions.callback({key: routerPath, type: 'reset'});
    };
    
    render () {
        const {route} = this.state;
        const {user} = this.props;
        // const profileTitle = account && account.user && account.user.name ? account.user.name : 'Profile';
        return (
            <View style={[ styles.container ]}>
                <Image
                    source={require('../../../assets/drawer_background07.png')}
                    style={styles.backgroundContainer}
                >
                    <Section
                        items={routes.map((routerRoute) => {
                            return {
                                value: routerRoute.name,
                                active: (!route && routerRoute.default) || route === routerRoute.path,
                                onPress: () => this._changeScene(routerRoute.path, routerRoute.pressPath),
                                onLongPress: () => this._changeScene(routerRoute.path, routerRoute.longPressPath)
                            };
                        })}
                    />
                    <Profile
                        image={<Image source={user.profileUrl} />}
                        primaryText={user.name}
                        secondaryText={user.email}
                    />
                </Image>
            </View>
        );
    }
}

