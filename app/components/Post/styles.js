
import ReactNative from 'react-native';
import Colors from '../../utils/Colors';

const {
    StyleSheet
} = ReactNative;

const styles = StyleSheet.create({
    postContainer: {
        marginTop: 0,
        padding: 5
    },
    postHeader: {
        flexDirection: 'row',
        marginBottom: 5
    },
    postHeaderNameContainer: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 10,
        justifyContent: 'space-between'
    },
    postHeaderName: {
        color: Colors.grey,
        fontSize: 12,
        fontWeight: 'bold'
    },
    postHeaderHandlerName: {
        color: Colors.overlayColor,
        fontSize: 10
    },
    postHeaderLocationContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginRight: 5
    },
    postHeaderTimeAgo: {
        color: Colors.grey,
        fontSize: 8,
        textAlign: 'right',
        fontWeight: 'bold'
    },
    postHeaderCityInfo: {
        color: Colors.overlayColor,
        fontSize: 8,
        textAlign: 'right'
    },
    postContentContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5
    },
    postContentText: {
        marginTop: 5,
        color: Colors.grey,
        fontSize: 10,
        flex: 1
    },
    alignSelf: {
        alignSelf: 'center'
    },
    
});

export default styles;