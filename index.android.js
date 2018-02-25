import ReactNative from 'react-native';
import Root from './app/Root';

const {
    AppRegistry,
} = ReactNative;
console.disableYellowBox = true;
AppRegistry.registerComponent('RNLoginLogout', () => Root);
