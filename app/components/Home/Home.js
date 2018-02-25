import React from 'react';
const {
    PureComponent,
    PropTypes
} = React;
import * as Animatable from 'react-native-animatable';
import {ScrollView, Image, StatusBar, View, Text, LayoutAnimation,
    Alert, Animated,TouchableOpacity,TouchableHighlight,TouchableWithoutFeedback,StyleSheet,} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
import {Fab} from '../AnimatedButton';
import Card from '../Core/Card';
import AppText from '../Core/AppText';
import Post from '../Post';
import content from './content';
import Colors from '../../utils/Colors';
import Icons from '../Core/FontAwesomeIcons';
import {SortableSudokuGrid} from '../components'
import {DragContainer, Draggable, DropZone} from './index'
import image_cash from './images/cash.png'
import image_credit from './images/credit.png'
import image_transfer from './images/transfer.png'
import image_loan from './images/loan.png'
import image_charge from './images/charge.png'
import image_payment from './images/payment.png'
import image_shopping from './images/shopping.png'
import image_service from './images/service.png'
import image_donate from './images/donate.png'

import image_add from './images/add.png'
import image_remove from './images/remove.png'
import image_locked from './images/locked.png'

const dataList = [
    {
        icon: image_cash,
        title: 'cash',
    },
    {
        icon: image_credit,
        title: 'credit',
    },
    {
        icon: image_transfer,
        title: 'transfer',
    },
    {
        icon: image_loan,
        title: 'loan',
    },
    {
        icon: image_charge,
        title: 'charge',
    },
    {
        icon: image_payment,
        title: 'payment',
    },
    {
        icon: image_shopping,
        title: 'shopping',
    },
    {
        icon: image_service,
        title: 'service',
    },
    {
        icon: image_donate,
        title: 'donate',
    },
];

const columnCount = 3;

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
        return <View style={{
            width: this.props.dragOver ? 110 : 100,
            height: this.props.dragOver ? 110 : 100,
            backgroundColor: '#ddd',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
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
        return <View style={{
            top: this.props.dragOver ? 0 : -100,
            height: 100,
            backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <View>
                <Text>{'DELETE'}</Text>
            </View>
        </View>
    }
}

class DraggyInner extends React.Component {
    render() {
        if (this.props.dragOver && !this.props.ghost && !this.props.dragging) {
            return <View style={{height: 100, width: 100, backgroundColor: 'green'}}/>
        }
        let shadows = {
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 20},
            shadowOpacity: .5,
            shadowRadius: 20,
            opacity: .5
        };
        return <View style={[{
            height: 100,
            width: 100,
            backgroundColor: this.props.ghost ? '#fff' : '#237'
        }, this.props.dragging ? shadows : null]}/>
    }
}

class Draggy extends React.Component {
    render() {
        return <Draggable data="Whatevs" style={{margin: 7.5}}>
            <DropZone>
                <DraggyInner/>
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
        this.numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        this.state = {
            startAnimation: false,
            animation: new Animated.Value(0),
            dataSource: [...dataList],
            candidates: [],
            sortable: false,
            longPressActivatedForManaging:false,
            startAnimationValueTo:0,
            scrollEnabled: true,
            disabled: false,
            managementButtonText: 'Manage',
            opacity: new Animated.Value(0),
            animated: {
                fromPositiontop: new Animated.Value(0),
            },
        };
        this._sortableSudokuGrid = null
    }

    componentDidMount() {
        try {

           // var contextTest = new Map();


        }
        catch (error) {
         //   bugsnag.notify(error);
            Alert.alert(
                'Wait!',
                'Sorry!' + error,
                [
                    {
                        text: 'Ignore', onPress: () => console.log('Cancel Pressed'), style: 'cancel'
                    },]
                , {cancelable: false}
            );
        }
    }

    _renderPost(post, i) {
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


    _onAnimationComplete() {
        this.props.logout();
        Actions.login();
    }

    _renderGridCell = (data, component) => {
        //console.log(`rerender!!! _renderGridCell`)
        return (

            <TouchableHighlight
                onLongPress={()=>  this._onPressManagementButton()}
                disabled={this.state.disabled}
                style={{width:80, height:80, padding: 1, position: 'relative',}}
                onPress={ this._onPressCell.bind(this, data) }>
                <View style={{flex: 1, padding: 1, position: 'relative', backgroundColor:"#ff" }}>
                <View style={{ overflow: 'hidden', backgroundColor: '#fff',
                    justifyContent: 'center', alignItems: 'center', flex: 1,
                    borderWidth: StyleSheet.hairlineWidth, borderColor: '#eee', }}>
                    <Image source={data.icon} style={{width: 30, height: 30, marginHorizontal: 5, marginBottom: 5,}}/>
                    <Text>{data.title}</Text>
                </View>
                <TouchableOpacity
                    disabled={!this.state.disabled}
                    style={{position: 'absolute', right: 8, top: 8, width: 30, height: 30, }}
                    onPress={this._onRemoveCellButtonPress.bind(this, component)}>
                    <Animated.View
                        style={{flex: 1, opacity: this.state.opacity, justifyContent: 'center', alignItems: 'center', }}>
                        <View
                            style={{ borderRadius: 10, borderWidth: StyleSheet.hairlineWidth, borderColor: '#FF7F7F', width: 22, height: 22, justifyContent: 'center', alignItems: 'center', overflow: 'hidden', }}>
                            <Image source={image_remove} style={{width: 20, height: 20, }}/>
                        </View>
                    </Animated.View>
                </TouchableOpacity></View>
            </TouchableHighlight>
        )
    };

    _activateEditPluginsOptions()
    {
        try {
            if(this.state.longPressActivatedForManaging === false) {
           /*     this.setState({longPressActivatedForManaging: true, startAnimationValueTo: 50},
                    Animated.timing(this.state.animated.fromPositiontop, {
                        toValue: this.state.startAnimationValueTo,
                        duration: 725,
                        delay: 100
                    }).start());*/
               this._onPressManagementButton();
            }
            else if(this.state.longPressActivatedForManaging === true)
            {
                this.setState({longPressActivatedForManaging: false, startAnimationValueTo: 0},
                    Animated.timing(this.state.animated.fromPositiontop, {
                        toValue: this.state.startAnimationValueTo,
                        duration: 725,
                        delay: 100
                    }).start())
            }
        }catch (error)
        {
            Alert.alert('clicked grid cell -> ' )
        }
    }

    _renderCandidateCell = (data, component) => {
        //console.log(`rerender!!! _renderCandidates`)
        return (
            <TouchableOpacity
                disabled={this.state.disabled}
                style={{flex: 1, padding: 6, position: 'relative', backgroundColor:"#182"}}
                onPress={ this._onPressCandidateCell.bind(this, data) }>
                <View style={{ overflow: 'hidden', backgroundColor: '#fff',
                    justifyContent: 'center', alignItems: 'center', flex: 1,
                    borderWidth: StyleSheet.hairlineWidth, borderColor: '#eee', }}>
                    <Image source={data.icon} style={{width: 30, height: 30, marginHorizontal: 10, marginBottom: 10,}}/>
                    <Text>{data.title}</Text>
                </View>
                <TouchableOpacity
                    disabled={!this.state.disabled}
                    style={{position: 'absolute', right: 8, top: 8, width: 30, height: 30, }}
                    onPress={this._onRemoveCandidatesCellButtonPress.bind(this, component)}>
                    <Animated.View
                        style={{flex: 1, opacity: this.state.opacity, justifyContent: 'center', alignItems: 'center', }}>
                        <View
                            style={{ borderRadius: 10, borderWidth: StyleSheet.hairlineWidth, borderColor: '#5CC46C', width: 22, height: 22, justifyContent: 'center', alignItems: 'center', overflow: 'hidden', }}>
                            <Image source={image_add} style={{width: 20, height: 20, }}/>
                        </View>
                    </Animated.View>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    };
    _onPressCell = (data) => {
        Alert.alert('clicked grid cell -> ' + data.title)
    };

    _onPressCandidateCell = (data) => {
        Alert.alert('clicked candidate cell -> ' + data.title)
    };

    _onPressManagementButton = () => {
        let scrollEnabled = !this.state.scrollEnabled;
        let disabled = !this.state.disabled;
        let managementButtonText = this.state.managementButtonText === 'Manage' ? 'Complete' : 'Manage';
        let sortable = !this.state.sortable;
        let opacity = sortable ? new Animated.Value(1) : new Animated.Value(0);
        this.setState({
            scrollEnabled,
            managementButtonText,
            disabled,
            sortable,
            opacity,
        });
        if (!sortable) {
            let sortedDataSource = this._sortableSudokuGrid.getSortedDataSource();
            console.log(`_onPressManagementButton get sorted/added/removed DataSource`);
            console.log(sortedDataSource);
            let candidateDataSource = this._candidatesSudokuGrid.getSortedDataSource();
            console.log(`_onPressManagementButton get sorted/added/removed candidateDataSource`);
            console.log(candidateDataSource)
        }
    };
    _onRemoveCellButtonPress = (component) => {
        let cellIndex = this._sortableSudokuGrid._cells.findIndex((cell) => {
            return cell.component === component
        });
        //console.log(`_onRemoveCellButtonPress cellIndex = ${cellIndex}`)

        this._sortableSudokuGrid.removeCell({
            cellIndex,
            callback: (removedDataList) => {
                //let sortedDataSource = this._sortableSudokuGrid.getSortedDataSource()
                console.log(`_onRemoveCellButtonPress get sortedDataSource`)
                //console.log(sortedDataSource)
                if(removedDataList.length > 0) {
                    let data = removedDataList[0]
                    this._candidatesSudokuGrid.addCell({
                        data,
                    })
                }
            }
        })
    };

    _onRemoveCandidatesCellButtonPress = (component) => {
        let cellIndex = this._candidatesSudokuGrid._cells.findIndex((cell) => {
            return cell.component === component
        })
        console.log(`_onRemoveCandidatesCellButtonPress cellIndex = ${cellIndex}`);

        this._candidatesSudokuGrid.removeCell({
            cellIndex,
            callback: (removedDataList) => {
                //let sortedDataSource = this._candidatesSudokuGrid.getSortedDataSource()
                //console.log(`_onRemoveCandidatesCellButtonPress get sortedDataSource`)
                //console.log(sortedDataSource)
                if(removedDataList.length > 0) {
                    let data = removedDataList[0]
                    this._sortableSudokuGrid.addCell({
                        data,
                    })
                }
            }
        })
    }
    render() {
        // DEBUG: this is materialistic here
        console.log("Hi");
        return (
            <View style={styles.homeContainer}>
                <View style={styles.homeComponentHolder}>
                    {/*<Text style={{fontWeight: 'bold', marginTop: 10, color:'#000', fontSize:10}}>Custom animation</Text>
                    */}
                    <View
                        //scrollEnabled={this.state.scrollEnabled}
                        style={{marginTop: 20, }}>
{/*
                        {this.state.longPressActivatedForManaging === true ?
                            ( <Animated.View
                                style={{ height:this.state.animated.fromPositiontop, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <View style={{flex: 1, justifyContent: 'center',}}>
                                    <Text>My Applications: </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={this._onPressManagementButton}>
                                    <View style={{flex: 1, justifyContent: 'center',}}>
                                        <Text>{this.state.managementButtonText}</Text>
                                    </View>
                                </TouchableOpacity>

                            </Animated.View> ): null}*/}

                        <SortableSudokuGrid
                            ref={ component => this._sortableSudokuGrid = component }
                            containerStyle={{ backgroundColor: '#fff', paddingTop:10,}}
                            columnCount={columnCount}
                            dataSource={this.state.dataSource}
                            renderCell={this._renderGridCell}
                            sortable={this.state.sortable}
                        />
                        <View
                            style={{height: 50, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor:'#000' }}>
                            <View style={{flex: 1, justifyContent: 'center',}}>
                                <Text>Candidates: </Text>
                            </View>
                        </View>
                        <SortableSudokuGrid
                            ref={ component => this._candidatesSudokuGrid = component }
                            containerStyle={{ backgroundColor: '#fff',}}
                            columnCount={columnCount}
                            dataSource={this.state.candidates}
                            renderCell={this._renderCandidateCell}
                            sortable={false}
                        />
                    </View>
                    <Fab
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
                    </Fab>
                </View>
            </View>
        );


    }
}
