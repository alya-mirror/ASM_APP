
import ReactNative from 'react-native';
import elevationPolyfill from '../../polyfill/Elevation';

const {
    StyleSheet
} = ReactNative;

const barStyles = StyleSheet.create({
    buttonContainer: {
        ...elevationPolyfill(4),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6563a4',
        borderWidth: 0,
        height: 40,
        marginBottom: 5,
    },
    loader: {
        height: 21,
        width: 21,
        alignSelf: 'center',
        flex: 1
    },
    buttonText: {
        fontSize: 14,
        textAlign: 'center'
    },
    alignCenter: {
        alignItems: 'center'
    },
    buttonWithHeight: {
        flexDirection: 'row',
        height: 45,
        flex: 1
    },
    fabContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1
    },
    fabButtonContainer: {
        position: 'relative',
        flex: 1,
    }
});

export default barStyles;
