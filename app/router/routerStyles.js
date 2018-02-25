
import {Platform, StyleSheet} from 'react-native';
import Colors from '../utils/Colors';
import elevationPolyfill from '../polyfill/Elevation';

const BAR_HEIGHT = Platform.OS === 'ios' ? 60 :50;
const LOLLIPOP = 21;

const styles = StyleSheet.create({
    navbar: {
        justifyContent: 'flex-start',
        height: BAR_HEIGHT,
        backgroundColor: Colors.overlayColor,//'#fff',
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: StyleSheet.hairlineWidth,
        shadowOffset: {
            height: StyleSheet.hairlineWidth,
        },
        borderBottomColor: 'rgba(0, 0, 0, 0.16)',
        borderBottomWidth: Platform.OS === 'android' && Platform.Version < LOLLIPOP ? StyleSheet.hairlineWidth :0,
        paddingHorizontal: 4,
        marginBottom: 4,
        ...elevationPolyfill(2)
    },
    title: {
        fontSize: 14,
        color: Colors.white,
    },
    leftButtonIconStyle: {
        height: 30,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    titleStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        alignItems: 'center',
        color: Colors.white,
        ...Platform.select({
            android: {
                textAlign: 'left',
                marginLeft: -70
            }
        })
    },
    iconContainer: {
        height: BAR_HEIGHT,
        width: BAR_HEIGHT + 8,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            android: {
                marginLeft: -15,
                marginTop: -16,
                marginBottom: -16
            },
            ios: {
                marginTop: -5,
                marginBottom: -5,
            }
        }),
    },
    icon: {
        color: Colors.white,
    }
});

export default styles;
