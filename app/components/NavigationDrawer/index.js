import React from 'react';
import ReactNative from 'react-native';
import {DefaultRenderer, Actions} from 'react-native-router-flux';
import MenuContainer from '../Menu/MenuContainer';
import DrawerLayout from './DrawerLayout';

const {
    PureComponent,
    PropTypes
} = React;

const {
    Dimensions
} = ReactNative;

const {
    width
} = Dimensions.get('window');

type Props = {
    navigationState: Object,
    onNavigate: Function,
}

export default class NavigationDrawer extends PureComponent<void, Props, void> {
    static propTypes: Props = {
        navigationState: PropTypes.object,
        onNavigate: PropTypes.func
    };
    
    componentDidMount () {
        Actions.refresh({key: 'drawer', ref: this.refs.navigation});
    }
    
    render () {
        const state = this.props.navigationState;
        const children = state.children;
        const firstChild = children[ 0 ];
        const isDrawerEnable = firstChild && firstChild.children && firstChild.children.length && firstChild.children[ 0 ].isDrawerEnable;
        return (
            <DrawerLayout
                drawerLockMode={isDrawerEnable ? 'unlocked' : 'locked-closed'}
                drawerWidth={Math.min(width * 0.85, 300)}
                keyboardDismissMode="on-drag"
                onDrawerClose={() => Actions.refresh({key: state.key, open: false})}
                onDrawerOpen={() => Actions.refresh({key: state.key, open: true})}
                ref="navigation"
                renderNavigationView={() => <MenuContainer />}>
                <DefaultRenderer navigationState={firstChild}
                                 onNavigate={this.props.onNavigate}/>
            </DrawerLayout>
        );
    }
}
