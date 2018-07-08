import ReactNative from 'react-native';
import Colors from '../../utils/Colors';

const {
    StyleSheet,
    Platform
} = ReactNative;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundContainer: {
        flex: 1,
        // remove width and height to override fixed static size
        width: null,
        height: null,
        justifyContent: 'flex-start',
        resizeMode: 'cover'
    },
    profileContainer: {
        height: 100,
        backgroundColor: Colors.fadedLightPri,
        paddingLeft: 30,
        paddingTop: 10
    },
    profilePrimaryText: {
        fontSize: 12,
        color: '#d7d5d5',
        marginTop: 5,
        fontWeight: 'bold',
        ...Platform.select({
            android: {},
            ios: {
                fontFamily: 'Avenir',
            }
        }),
        marginLeft: -5
    },
    profileSecondaryText: {
        fontSize: 10,
        color: '#bfbdbd',
        ...Platform.select({
            android: {},
            ios: {
                fontFamily: 'Avenir',
            }
        }),
        marginLeft: -5
    },
    section: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 8,
    },
    sectionItem: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        paddingLeft: 16
    },
    sectionValue: {
        flex: 1,
        paddingLeft: 16,
    },
    sectionFont: {
        fontSize: 15,
        paddingTop: 0,
        color: Colors.white
    },
    sectionActiveItemContainer: {
        borderLeftWidth: 2,
        borderLeftColor: '#6cd4c8',
        marginLeft: 16,
        height: 20
    },
    sectionActiveFont: {
        color: '#F4FDFF'
    }
    
});

export default styles;

