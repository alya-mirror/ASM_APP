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
        backgroundColor:'#fff'
    },
    imageContainer: {
        flex: 1,
        // remove width and height to override fixed static size
        width: null,
        height: null,
        justifyContent: 'space-between',
        //resizeMode: 'cover'
    },
    logoContainer: {
        flex: 1,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoContainerTrain: {
        flex: 1,
        top:172,
        right:5,
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
        backgroundColor: 'rgba(000, 000, 000, 0.2)',
        paddingBottom: 20,
        flexDirection: 'column',
        paddingLeft: "10%",
        paddingRight: "10%",
    },
    signUpText: {
        color: Colors.white,
        fontSize: 14,
        textAlign: 'center',
    },
    signUpTextView: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
export const  TrainingScreenStyle = StyleSheet.create({
    container:
        {
            //flex: 1,
            width: Dimensions.get('window').width ,
            height:210,
            padding:'10%',
            marginTop:'35%',
            alignItems:'center',
            textAlign:'left',
            // backgroundColor:Colors.primary,

        },
    welcomeText:
        {
            marginTop:50,
            fontSize: 30,
            fontWeight: '600',
            color:Colors.primary,
        },
    subTitleWelcomeText:
        {
            paddingTop:0,
            fontSize: 12,
            fontWeight: '600',
            color:Colors.primary,
        },
    startingText:
        {
            fontSize: 12,
            //color:Colors.primaryDark,
            fontWeight: '400',
            paddingTop:10,
        },
});

export default styles;
