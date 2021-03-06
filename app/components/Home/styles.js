import {StyleSheet,
    Dimensions} from 'react-native';
import Colors from '../../utils/Colors';
const {width: WINDOW_WIDTH , height: WINDOW_HEIGHT} = Dimensions.get('window');

export const styles = StyleSheet.create({
    homeContainer:
        {
            backgroundColor:'#f1f1e9',
            width:'100%',
            height:'100%',
          //  padding:'1%',
        },
    homeComponentHolder:
        {
            backgroundColor:'#f1f1e9',
            width:'100%',
            paddingTop:'7%',
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
    },
    fabButtonSetting: {
        position: 'absolute',
        bottom: 90,
        right: 40,
        borderRadius: 20,
    },
    fabButtonLeft: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        borderRadius: 20,
    },
    pluginContainerStyle:{
      flex:1,
        width:'100%',
        marginTop:3,
        marginBottom:5,
        borderRadius: 40,
        position:'relative',
        backgroundColor: '#e5e5dd',
    },
});
export  const searchBox = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start'
    },
    emailItem:{
        borderBottomWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.3)',
        padding: 10
    },
    emailSubject: {
        color: 'rgba(0,0,0,0.5)'
    },
    searchInput:{
        marginTop:'10%',
        padding: 10,
        //flex:1,
        borderRadius:40,
        left:30,
        alignItems:'center',
        width:'85%',
        height:30,
        borderColor: '#CCC',
        borderWidth: 1
    },
    searchInputPop:{
        marginTop:'7%',
        padding: 5,
        //flex:1,
        left:25,
        borderRadius:40,
        alignItems:'center',
        width:'85%',
        height:30,
        borderColor: '#CCC',
        borderWidth: 1
    }
});
export const SettingScreenStyles = StyleSheet.create({
    homeContainer:
        {
            backgroundColor:'#f1f1e9',
            width:'100%',
            height:'100%',
            //  padding:'1%',
        },
    homeComponentHolder:
        {
             backgroundColor:'#f1f1e9',

            //backgroundColor:'#23f181',
            width:'100%',
            paddingTop:'10%',
            height:'100%',
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
    },
    fabButtonLeft: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        borderRadius: 20,
    },
    pluginContainerStyle:{
        flex:1,
        marginTop:3,
        marginBottom:5,
        borderRadius: 40,
        position:'relative',
        backgroundColor: '#e5e5dd',
    },
});