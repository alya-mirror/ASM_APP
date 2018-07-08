
import React from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
import {Fab} from '../AnimatedButton';
import Card from '../Core/Card';
import AppText from '../Core/AppText';
import Post from '../Post';
import content from './content';
import Colors from '../../utils/Colors';
import Icons from '../Core/FontAwesomeIcons';
import {  DragContainer,  Draggable,  DropZone} from './index'
const {    PureComponent,    PropTypes} = React;
const {    ScrollView,    Image,    StatusBar,    View,Text,    LayoutAnimation,    Alert,} = ReactNative;

type State = {
    startAnimation: boolean,
}

type Props = {
    logout: Function,
}

class MyDropZoneContent extends React.Component {
  componentWillReceiveProps({dragOver}) {
    if (dragOver !== this.props.dragOver) LayoutAnimation.easeInEaseOut();
  }
  render() {
    return <View style={{width: this.props.dragOver ? 110 : 100, height:  this.props.dragOver ? 110 : 100, backgroundColor: '#ddd', alignItems: 'center', justifyContent: 'center'}}>
      <View>
        <Text>{"LET GO"}</Text>
      </View>
    </View>
  }
}
class DeleteZone extends React.Component {
  componentWillReceiveProps({dragOver}) {
    if (dragOver !== this.props.dragOver) LayoutAnimation.easeInEaseOut();
  }
  render() {
    return <View style={{top: this.props.dragOver ? 0: -100, height: 100, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center'}}>
      <View>
        <Text>{'DELETE'}</Text>
      </View>
    </View>
  }
}

class DraggyInner extends React.Component {
  render() {
    if (this.props.dragOver && !this.props.ghost && !this.props.dragging) {
      return <View style={{height: 100, width: 100, backgroundColor: 'green'}} />
    }
    let shadows = {shadowColor: 'black', shadowOffset: {width: 0, height: 20}, shadowOpacity: .5, shadowRadius: 20, opacity: .5};
    return <View style={[{height: 100, width: 100, backgroundColor: this.props.ghost ? '#fff' : '#237'}, this.props.dragging ? shadows : null]} />
  }
}
class Draggy extends React.Component {
  render() {
    return <Draggable data="Whatevs" style={{margin: 7.5}}>
        <DropZone>
          <DraggyInner />
        </DropZone>
    </Draggable>
  }
}
export default class Home extends PureComponent<void, Props, State> {
    static propTypes: Props = {
        logout: PropTypes.func,
    };
    constructor(props) {
          super(props);
          this.displayName = 'DragDropTest';
          state={
                  startAnimation: false,
                };
      }

    _renderPost (post, i) {
        return (
            <Post
                avatarImage={post.profile}
                city={post.city}
                image={post.image}
                key={i}
                message={post.message}
                name={post.name}
                time={post.time}
                username={post.username}
            />
        );
    }

    _renderThumbnailRow = (source, i) => (
        <Card
            key={i}
            style={styles.thumbnailContainer}>
            <Image
                resizeMode={'cover'}
                source={source}
                style={styles.thumbnail}/>
        </Card>
    );

    _onPress () {
        this.setState({
            startAnimation: true
        });
    }

    _onAnimationComplete () {
        this.props.logout();
        Actions.login();
    }
    onstart()
    {
        console.log("Hi HI IH ");
    }

    render () {
      // DEBUG: this is materialistic here
      console.log("Hi");
        return <DragContainer onDragEnd={e => Alert.alert("Dropped it on area 2")} onDragStart={this.onstart()}>

            <View  style={{backgroundColor:"#fff", height:"100%", width:'100%', justifyContent:'center', alignItems:'center'}}>
            <DropZone style={{position: 'absolute', top: 0, left: 0, right: 0, height: 100}} onDrop={() => Alert.alert('DELETE!!!')}>
                   <DeleteZone />
                 </DropZone>
             {/*   // <View style={{backgroundColor:"#fff", height:"30%", width:'80%',}}>
                //
                //     <Text
                //         style={{color:Colors.primary, fontSize:30, textAlign:'center'}}>Welcome To Alya Smart Mirror</Text>
                // </View>*/}

                <View style={{flex: 1, padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                    <DropZone onDrop={e => Alert.alert("Dropped it on area 1")}>
                        <MyDropZoneContent />
                    </DropZone>
                    <DropZone onEnter={ Alert.alert("Dropped it on area 12")} onDrop={e => Alert.alert("Dropped it on area 2")}>
                        <DeleteZone />
                    </DropZone>
                </View>

                <View style={{height: 115}}>
                    <ScrollView horizontal={true}>
                        <View style={{justifyContent: 'center', alignItems: 'flex-end', flexDirection: 'row'}}>
                            <Draggy />
                            <Draggy />
                            <Draggy />
                            <Draggy />
                            <Draggy />
                            <Draggy />
                            <Draggy />
                        </View>
                    </ScrollView>
                </View>
         {/*       <Fab
                    duration={1000}
                    onComplete={this._onAnimationComplete.bind(this)}
                    onPress={this._onPress.bind(this)}
                    rippleColor={Colors.fadedWhite}
                    startAnimation={this.state.startAnimation}
                    style={styles.fabButton}
                    width={50}
                >
                    <Icons
                        color={Colors.white}
                        name="sign-out"
                        size={24}
                    />
                </Fab>*/}
            </View>
          </DragContainer>

    }
}
