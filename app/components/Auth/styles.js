import ReactNative from 'react-native';
import Colors from '../../utils/Colors';

const {
    Platform,
    StyleSheet,
    Dimensions,
} = ReactNative;

const {height: WINDOW_HEIGHT} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    imageContainer: {
        flex: 1,
        // remove width and height to override fixed static size
        width: null,
        height: null,
        justifyContent: 'space-between',
        resizeMode: 'cover'
    },
    logoContainer: {
        flex: 1,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoContent: {
        color: Colors.white,
        fontSize: 24,
        textAlign: 'center',
        marginTop: 10,
        backgroundColor: Colors.transparent
    },
    loginContainer: {
        backgroundColor: 'rgba(000, 000, 000, .2)',
        paddingBottom: 20,
        flexDirection: 'column',
        paddingLeft:"10%",
        paddingRight:"10%",
    },
    signUpText: {
        color: Colors.white,
        fontSize: 14,
        textAlign: 'center',
    },
    signUpTextView: {
        flexDirection:'row',
        marginTop: 10,
        alignItems:'center',
        justifyContent:'center',
    }
});

export default styles;
