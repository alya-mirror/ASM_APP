import {StyleSheet,
    Dimensions} from 'react-native';
import Colors from '../../utils/Colors';
const {width: WINDOW_WIDTH , height: WINDOW_HEIGHT} = Dimensions.get('window');

const styles = StyleSheet.create({
    homeContainer:
        {
            backgroundColor:'#ff8227',
            width:'100%',
            height:'100%',
            padding:'1%',
        },
    homeComponentHolder:
        {backgroundColor:'#fff',
            width:'100%',
            paddingTop:'3%',
            height:'100%',
            padding:'1%',
        },
    block: {
        flex: 1,
        margin: 8,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        backgroundColor: Colors.transparent,
        marginTop: -12
    },
    thumbnailContainer: {
        width: WINDOW_WIDTH / 1.5 + 2,
        height: WINDOW_WIDTH / 1.5 + 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 0
    },
    cardText: {
        color: Colors.grey,
        margin: 5,
        fontWeight: 'bold',
        fontSize: 10
    },
    marginTop0: {
        marginTop: 0
    },
    thumbnail: {
        width: WINDOW_WIDTH / 1.5,
        height: WINDOW_WIDTH / 1.5
    },
    fabButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        borderRadius: 20,
    }
});

export default styles;
