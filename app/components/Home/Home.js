import React from 'react';

const {
    PureComponent,
    PropTypes
} = React;
import * as Animatable from 'react-native-animatable';
import {
    ScrollView, Image, StatusBar, View, Text, LayoutAnimation,ToastAndroid,
    Alert, Animated, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, StyleSheet,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {styles, searchBox} from './styles';
import {Fab} from '../AnimatedButton';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from '../Core/Card';
import AppText from '../Core/AppText';
import Post from '../Post';
import content from './content';
import Colors from '../../utils/Colors';
import Icons from '../Core/FontAwesomeIcons';
import SearchInput, {createFilter} from 'react-native-search-filter';
import {SortableSudokuGrid} from '../components'
import {DragContainer, Draggable, DropZone} from './index'
import image_youtube from './images/youtube.png'
import image_time from './images/time.png'
import image_calendar from './images/calendar.png'
import image_loan from './images/loan.png'
import image_charge from './images/charge.png'
import image_payment from './images/payment.png'
import image_shopping from './images/shopping.png'
import image_service from './images/service.png'
import image_donate from './images/donate.png'
import PopupDialog from 'react-native-popup-dialog';
import image_add from './images/add.png'
import image_remove from './images/remove.png'
import image_locked from './images/locked.png'
import config from '../../../config.default.json'
const KEYS_TO_FILTERS = ['title'];
const dataList = [
    {
        icon: image_youtube,
        title: 'YouTube',
    },
    {
        icon: image_time,
        title: 'Clock',
    },
    {
        icon: image_calendar,
        title: 'Date Time',
    }

];

const columnCount = 3;

type State = {
    startAnimation: boolean,
}

type Props = {
    logout: Function,
}
export default class Home extends PureComponent<void, Props, State> {
    static propTypes: Props = {
        logout: PropTypes.func,
    };

    constructor(props) {
        super(props);
        console.log('user installed addons ' , global.userAddons)
        console.log('user approved addons ' , global.approvedAddons)
        this.displayName = 'DragDropTest';
        this.numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        this.state = {
            startAnimation: false,
            animation: new Animated.Value(0),
            dataSource: global.userAddons,
            candidates: global.approvedAddons,
            sortable: false,
            longChecked: true,
            longPressAddonsButtonStatus:1,
            longPressAddonsButtonIcon:'md-add',
            longCheckedPop: false,
            searchTerm: '',
            searchTermPop: '',
            longPressActivatedForManaging: false,
            startAnimationValueTo: 0,
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
    }

    _onAnimationComplete() {
        // this.props.logout();
        this.popupDialog.show();
        //  Actions.login();
    }

    searchUpdated(term) {
        this.setState({searchTerm: term})
    }

    searchUpdatedPop(term) {
        this.setState({searchTermPop: term})
    }

    _renderGridCell = (data, component) => {
         console.log(`rerender!!! _renderGridCell`);
        return (

            <TouchableHighlight
                onLongPress={() => this._activateEditPluginsOptions()}
                disabled={this.state.disabled}
                underlayColor={"#fff"}
                style={{width: 100, height: 75, padding: 1, position: 'relative', borderRadius: 60,}}
                onPress={this._onPressCell.bind(this, data)}>
                <View style={{flex: 1, padding: 1, position: 'relative', backgroundColor: "transparent", borderRadius: 60,}}>
                    <View style={{
                        overflow: 'hidden',
                        justifyContent: 'center', alignItems: 'center', flex: 1,
                    }}>
                        <Image source={data[2]}
                               style={{width: 50, height: 50, marginHorizontal: 5, marginBottom: 5,}}/>
                         <Text style={{fontSize:12, textAlign:'center', width:100,}}>{data[1]}</Text>
                    </View>
                    <TouchableOpacity
                        disabled={!this.state.disabled}
                        style={{position: 'absolute', right: 8, top: 15, width: 30, height: 30,}}
                        onPress={this._onRemoveCellButtonPress.bind(this, component)}>
                        <Animated.View
                            style={{
                                flex: 1,
                                opacity: this.state.opacity,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <View
                                style={{
                                    borderRadius: 10,
                                    borderWidth: StyleSheet.hairlineWidth,
                                    borderColor: '#fff',
                                    width: 22,
                                    height: 22,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    overflow: 'hidden',
                                    backgroundColor: '#fff'
                                }}>
                                <Icons
                                    color={Colors.delete}
                                    name="md-remove-circle"
                                    size={18}
                                />
                                {/*  <Image source={image_remove} style={{width: 20, height: 20, }}/>*/}
                            </View>
                        </Animated.View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={!this.state.disabled}
                        style={{position: 'absolute', left: 8, top: 15, width: 30, height: 30,}}
                        onPress={this._onSettingCellButtonPress.bind(this, component, data)}>
                        <Animated.View
                            style={{
                                flex: 1,
                                opacity: this.state.opacity,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <View
                                style={{
                                    backgroundColor: '#fff',
                                    borderRadius: 10,
                                    borderWidth: StyleSheet.hairlineWidth,
                                    borderColor: '#fff',
                                    width: 22,
                                    height: 22,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    overflow: 'hidden',
                                }}>
                                <Icons
                                    color={Colors.grey}
                                    name="md-settings"
                                    size={18}
                                />
                                {/*<Image source={image_remove} style={{width: 20, height: 20, }}/>*/}
                            </View>
                        </Animated.View>
                    </TouchableOpacity>
                </View>
            </TouchableHighlight>
        )
    };

    _activateEditPluginsOptions() {
        try {
            if (this.state.longPressActivatedForManaging === false) {
                this._onPressManagementButton();
                this.setState({longChecked: false,
                    longCheckedPop: true,
                    longPressAddonsButtonStatus:2,
                    longPressAddonsButtonIcon:'md-checkmark-circle',

                });
            }
            else if (this.state.longPressActivatedForManaging === true) {
            }
        } catch (error) {
            Alert.alert('clicked grid cell -> ')
        }
    }

    _renderCandidateCell = (data, component) => {
        //console.log(`rerender!!! _renderCandidates`)
        return (
            <TouchableHighlight
                onLongPress={() => this._activateEditPluginsOptions()}
                disabled={this.state.disabled}
                underlayColor={"#fff"}
                style={{width: 70, height: 70, padding: 1, position: 'relative', borderRadius: 60,backgroundColor: "transparent"}}
                onPress={this._onPressCandidateCell.bind(this, data)}>
                <View style={{flex: 1, padding: 1, position: 'relative', backgroundColor: "transparent"}}>
                    <View style={{
                        overflow: 'hidden', backgroundColor: "transparent",
                        justifyContent: 'center', alignItems: 'center', flex: 1,
                    }}>
                        <Image source={data[2]}
                               style={{width: 40, height: 40, marginHorizontal: 10, marginBottom: 5, resizeMode:'center'}}/>
                        <Text style={{fontSize:12,}}>{data[1]}</Text>
                    </View>
                    <TouchableOpacity
                        disabled={!this.state.disabled}
                        style={{position: 'absolute', left: 5, top: 8, width: 30, height: 30,}}
                        onPress={this._onRemoveCandidatesCellButtonPress.bind(this, component)}>
                        <Animated.View
                            style={{
                                flex: 1,
                                opacity: this.state.opacity,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <View
                                style={{
                                    backgroundColor: '#fff',
                                    borderRadius: 10,
                                    borderWidth: StyleSheet.hairlineWidth,
                                    borderColor: '#5CC46C',
                                    width: 20,
                                    height: 20,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    overflow: 'hidden',
                                }}>
                                <Icons
                                    color={Colors.success}
                                    name="md-add-circle"
                                    size={18}
                                />
                            </View>
                        </Animated.View>
                    </TouchableOpacity>
                </View>
            </TouchableHighlight>
        )
    };
    _onPressCell = (data) => {
        Alert.alert('Long press to manage ' + data[1])
    };

    _onPressCandidateCell = (data) => {
        Alert.alert('Long press to Install ' + data[1])
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
        console.log("component", component);
        let cellIndex = this._sortableSudokuGrid._cells.findIndex((cell) => {
            return cell.component === component
        });
        //console.log(`_onRemoveCellButtonPress cellIndex = ${cellIndex}`)


        console.log("component", component.props.data[0]);
 if(component.props.data[0] === '123' || component.props.data[0] === '123456' ||component.props.data[0] === '1234'|| component.props.data[0] === '1234567')
 {
     Alert.alert("It's not Possible to uninstall core services")
 }else {
     this._sortableSudokuGrid.removeCell({
         cellIndex,
         callback: (removedDataList) => {
             //let sortedDataSource = this._sortableSudokuGrid.getSortedDataSource()
             console.log(`_onRemoveCellButtonPress get sortedDataSource`)
             //console.log(sortedDataSource)
             if (removedDataList.length > 0) {
                 let data = removedDataList[0]
                 this._candidatesSudokuGrid.addCell({
                     data,
                 })
             }
         }
     });
     return fetch(`http://${config.host}:3100/api/userAddons/${encodeURIComponent(component.props.data[4])}`, {
         method: 'DELETE',
         headers: {
             Accept: 'application/json',
             'Content-type': 'application/json'
         },

     })
         .then((response) => {
             console.log('unInstall' +  JSON.stringify(response))


         })

         .catch((error) => {
             console.log(error);

         });
 }

    };
    _onSettingCellButtonPress = (component, data) => {
        let cellIndex = this._sortableSudokuGrid._cells.findIndex((cell) => {
            return cell.component === component
        });
        console.log('datass' , JSON.stringify(component.props.data[3]));
        //console.log(`_onRemoveCellButtonPress cellIndex = ${cellIndex}`)
        // Alert.alert('clicked grid cell -> ' + data.title)
    /*    return fetch(`http://localhost.:3100/api/userConfigurationSchema/:${encodeURIComponent(component.props.data[3])}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },

        })
            .then((response) => {
                console.log('unInstall' +  JSON.stringify(response))


                console.log('response data ' , JSON.stringify(response));
            })

            .catch((error) => {
                console.log(error);

            });*/
         Actions.PluginSetting({text: data[1], addonName:component.props.data[3], ImageName:component.props.data[2], addonID:component.props.data[4]});
 /*       this._sortableSudokuGrid.removeCell({
            cellIndex,
            callback: (removedDataList) => {
                //let sortedDataSource = this._sortableSudokuGrid.getSortedDataSource()
                console.log(`_onRemoveCellButtonPress get sortedDataSource`)
                //console.log(sortedDataSource)
                if (removedDataList.length > 0) {
                    let data = removedDataList[0]
                    this._candidatesSudokuGrid.addCell({
                        data,
                    })
                }
            }
        })*/
    };
    _onRemoveCandidatesCellButtonPress = (component) => {
        console.log('_onRemoveCandidatesCellButtonPress cellIndex1',component.props.data);
        let cellIndex = this._candidatesSudokuGrid._cells.findIndex((cell) => {
            return cell.component === component
        })
        console.log(`_onRemoveCandidatesCellButtonPress cellIndex = ${cellIndex}`);

        this._candidatesSudokuGrid.removeCell({
            cellIndex,
            callback: (removedDataList) => {
               // let sortedDataSource = this._candidatesSudokuGrid.getSortedDataSource()
                // console.log(`_onRemoveCandidatesCellButtonPress get sortedDataSource`, sortedDataSource)
                 console.log(removedDataList);
                if (removedDataList.length === 1 ) {
                    console.log('true');
                    let data = removedDataList[0];
                    this._sortableSudokuGrid.addCell({
                        data,
                    })
                }
            }
        })

        return fetch('http://'+config.host+':3100/api/userAddons/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                    userId: global.userInfo.userId,
                    addonId: component.props.data[0],
                }
            )
        })
            .then((response) => {
                console.log('install' +  JSON.stringify(response));
             /*       ToastAndroid.showWithGravity(
                        'install' +  JSON.stringify(response),
                           ToastAndroid.LONG,
                           ToastAndroid.BOTTOM,
                           200,
                           50,
                       );*/

            })

            .catch((error) => {
                console.log(error);

            });

    };

    _onPress() {
        /*   this.setState({
                startAnimation: true
            });*/
        if(this.state.longPressAddonsButtonStatus === 1){
            this.popupDialog.show();
        }else if(this.state.longPressAddonsButtonStatus ===2)
        {
            this.setState({longChecked: true,
                longCheckedPop: false,
                longPressAddonsButtonStatus:1,
                longPressAddonsButtonIcon:'md-add',

            });
            this._onPressManagementButton();
        }

    }

    mirrorPositionSetting()
    {
        return fetch('http://'+ config.host+':3100/api/userAddons/getAll/5be7c29f76c4c0141e376729', {
            method: 'get',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log('responseJson' , JSON.stringify(responseJson)   );
               //
                let userAddons = [];
                return fetch('http://'+ config.host+':3100/api/addons/5be7c29f76c4c0141e376729' , {
                    method: 'get',
                    headers: {
                        Accept: 'application/json',
                        'Content-type': 'application/json'
                    }
                }).then((response) => response.json())
                    .then((response) => {
                        console.log('GET' , JSON.stringify(response.userInstalledAddons)   );
                        for (let addon of response.userInstalledAddons)
                        { console.log('Inn'     );
                            for (let userPAddon of responseJson.userAddons)
                            {
                                if(addon._id === userPAddon.addonId)
                                {
                                    userAddons.push({
                                         _id :userPAddon._id,
                                         userId :userPAddon.userId,
                                         addonId :userPAddon.addonId,
                                        addonName:addon.name,
                                         coreSettings :{
                                             position : userPAddon.coreSettings.position
                                        },
                                    })
                                }
                            }
                        }
                        console.log('userPAddon' , userAddons  );
                        Actions.MirrorScreen({userInstalledAddons:userAddons , userAddonsOrginal:responseJson.userAddons });
                    })

                    .catch((error) => {
                        console.log(error);

                    });

            })

            .catch((error) => {
                console.log(error);

            });
     //
    }
    _onPressComplete() {

    }

    render() {
        console.log('render lists',  global.userAddons ,  global.approvedAddons)
        const filteredDataList = this.state.dataSource.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
        const dataGridSource = filteredDataList;
        const filteredDataListPop = this.state.candidates.filter(createFilter(this.state.searchTermPop, KEYS_TO_FILTERS));
        const dataGridSourceCandidates = filteredDataListPop;
        const {
            longPressAddonsButtonIcon,
            startAnimation,
        } = this.state;
        return (
            <View style={styles.homeContainer}>
                <StatusBar
                    animated
                    backgroundColor={Colors.primaryDark}
                    barStyle="light-content"
                    // translucent
                />
                <View style={styles.homeComponentHolder}>
                    {/*<Text style={{fontWeight: 'bold', marginTop: 10, color:'#000', fontSize:10}}>Custom animation</Text>
                    */}

                    <SearchInput
                        onChangeText={(term) => {
                            this.searchUpdated(term)
                        }}
                        style={searchBox.searchInput}
                        placeholder="Search your add-ons"
                    />
                    <View
                        //scrollEnabled={this.state.scrollEnabled}
                        style={{marginTop: 30, backgroundColor: 'transparent', alignItems: 'center',}}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <SortableSudokuGrid
                                ref={component => this._sortableSudokuGrid = component}
                                containerStyle={{backgroundColor: 'transparent', alignItems: 'center',}}
                                columnCount={columnCount}
                                rowWidth={300}
                                rowHeight={100}
                                dataSource={this.state.dataSource}
                                renderCell={this._renderGridCell}
                                sortable={false}
                                //sortable={this.state.sortable}
                            />
                        </ScrollView>
                    </View>

                    <PopupDialog
                        dialogTitle={

                            <SearchInput
                                onChangeText={(term) => {
                                    this.searchUpdatedPop(term)
                                }}
                                style={searchBox.searchInputPop}
                                placeholder="Search for new add-ons"
                            />}
                        dialogStyle={{borderRadius: 40 , backgroundColor: '#e5e5dd'}}
                        dialogAnimation={'FadeAnimation'}
                        width={'80%'}
                        height={300}
                        ref={(fadeAnimationDialog) => {
                            this.popupDialog = fadeAnimationDialog;
                        }}
                    >
                        <View style={styles.pluginContainerStyle}>
                {/*             <ScrollView style={{backgroundColor: 'transparent', padding: 5, borderRadius: 30,}}>*/}
                                <SortableSudokuGrid
                                    rowWidth={280}
                                    ref={component => this._candidatesSudokuGrid = component}
                                    containerStyle={{
                                        flex:1,
                                    //    backgroundColor: '#078',
                                        // width:10,
                                        padding: 5,
                                       // height:200,
                                        borderRadius: 30,
                                         position: 'relative',
                                    }}
                                     rowHeight={80}
                                    columnCount={3}
                                    dataSource={this.state.candidates}
                                    renderCell={this._renderCandidateCell}
                                    sortable={false}
                                />
                  {/*           </ScrollView>*/}
                        </View>
                    </PopupDialog>
                    <Fab
                        //duration={1000}
                        onComplete={this._onAnimationComplete.bind(this)}
                        onPress={this._onPress.bind(this)}
                        rippleColor={Colors.fadedWhite}
                        startAnimation={startAnimation}
                        style={styles.fabButton}
                        width={50}
                    >
                        <Icons
                            color={Colors.white}
                            name={longPressAddonsButtonIcon}
                            size={24}
                        />
                    </Fab>

                    <Fab
                        //duration={1000}
                   //     onComplete={this._onAnimationComplete.bind(this)}
                        onPress={this.mirrorPositionSetting.bind(this)}
                        rippleColor={Colors.fadedWhite}
                        startAnimation={startAnimation}
                        style={styles.fabButtonSetting}
                        width={30}
                    >
                        <MaterialIcon
                            color={Colors.white}
                            name={"settings"}
                            size={15}
                        />
                    </Fab>
                </View>
            </View>
        );


    }
}
