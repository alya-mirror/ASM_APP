import React from 'react';

const {
    PureComponent,
    PropTypes
} = React;
import * as Animatable from 'react-native-animatable';
import {
    ScrollView, Image, StatusBar, View, Text, LayoutAnimation,
    Alert, Animated, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, StyleSheet,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {styles, searchBox} from './styles';
import {Fab} from '../AnimatedButton';
import Card from '../Core/Card';
import AppText from '../Core/AppText';
import Post from '../Post';
import content from './content';
import Colors from '../../utils/Colors';
import Icons from '../Core/FontAwesomeIcons';
import SearchInput, {createFilter} from 'react-native-search-filter';
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
import PopupDialog from 'react-native-popup-dialog';
import image_add from './images/add.png'
import image_remove from './images/remove.png'
import image_locked from './images/locked.png'

const KEYS_TO_FILTERS = ['title'];
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
        title: 'pay',
    },
    {
        icon: image_shopping,
        title: 'shop',
    },
    {
        icon: image_service,
        title: 'service',
    }, {
        icon: image_donate,
        title: 'donate',
    }, {
        icon: image_donate,
        title: 'Clock',
    }, {
        icon: image_donate,
        title: 'Amazon',
    }, {
        icon: image_donate,
        title: '3',
    }, {
        icon: image_donate,
        title: '4',
    },
    {
        icon: image_donate,
        title: '5',
    }, {
        icon: image_donate,
        title: '6',
    }, {
        icon: image_donate,
        title: '7',
    },
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
        this.displayName = 'DragDropTest';
        this.numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        this.state = {
            startAnimation: false,
            animation: new Animated.Value(0),
            dataSource: [...dataList],
            candidates: [],
            sortable: false,
            longChecked: true,
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
        //console.log(`rerender!!! _renderGridCell`)
        return (

            <TouchableHighlight
                onLongPress={() => this._activateEditPluginsOptions()}
                disabled={this.state.disabled}
                underlayColor={"#fff"}
                style={{width: 75, height: 75, padding: 1, position: 'relative', borderRadius: 60,}}
                onPress={this._onPressCell.bind(this, data)}>
                <View style={{flex: 1, padding: 1, position: 'relative', backgroundColor: "#fff", borderRadius: 60,}}>
                    <View style={{
                        overflow: 'hidden',
                        justifyContent: 'center', alignItems: 'center', flex: 1,
                    }}>
                        <Image source={data.icon}
                               style={{width: 30, height: 30, marginHorizontal: 5, marginBottom: 5,}}/>
                        <Text>{data.title}</Text>
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
                this.setState({longChecked: false});
                this.setState({longCheckedPop: true});
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
                style={{width: 70, height: 70, padding: 1, position: 'relative', borderRadius: 20,}}
                onPress={this._onPressCandidateCell.bind(this, data)}>
                <View style={{flex: 1, padding: 1, position: 'relative', backgroundColor: "#fff"}}>
                    <View style={{
                        overflow: 'hidden', backgroundColor: '#fff',
                        justifyContent: 'center', alignItems: 'center', flex: 1,
                    }}>
                        <Image source={data.icon}
                               style={{width: 30, height: 30, marginHorizontal: 10, marginBottom: 10,}}/>
                        <Text>{data.title}</Text>
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
                if (removedDataList.length > 0) {
                    let data = removedDataList[0]
                    this._candidatesSudokuGrid.addCell({
                        data,
                    })
                }
            }
        })
    };
    _onSettingCellButtonPress = (component, data) => {
        let cellIndex = this._sortableSudokuGrid._cells.findIndex((cell) => {
            return cell.component === component
        });
        //console.log(`_onRemoveCellButtonPress cellIndex = ${cellIndex}`)
        // Alert.alert('clicked grid cell -> ' + data.title)
        Actions.PluginSetting({text: data.title});
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
                if (removedDataList.length > 0) {
                    let data = removedDataList[0]
                    this._sortableSudokuGrid.addCell({
                        data,
                    })
                }
            }
        })
    };

    _onPress() {
        /*   this.setState({
                startAnimation: true
            });*/
        this.popupDialog.show();
    }

    _onPressComplete() {
        this.setState({longChecked: true});
        this.setState({longCheckedPop: false});
        this._onPressManagementButton();
    }

    render() {
        const filteredDataList = this.state.dataSource.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
        const dataGridSource = filteredDataList;
        const filteredDataListPop = this.state.candidates.filter(createFilter(this.state.searchTermPop, KEYS_TO_FILTERS));
        const dataGridSourceCandidates = filteredDataListPop;
        return (
            <View style={styles.homeContainer}>
                <View style={styles.homeComponentHolder}>
                    {/*<Text style={{fontWeight: 'bold', marginTop: 10, color:'#000', fontSize:10}}>Custom animation</Text>
                    */}

                    <SearchInput
                        onChangeText={(term) => {
                            this.searchUpdated(term)
                        }}
                        style={searchBox.searchInput}
                        placeholder="Type a message to search"
                    />
                    <View
                        //scrollEnabled={this.state.scrollEnabled}
                        style={{marginTop: 15, backgroundColor: 'transparent', alignItems: 'center',}}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <SortableSudokuGrid
                                ref={component => this._sortableSudokuGrid = component}
                                containerStyle={{backgroundColor: 'transparent', alignItems: 'center',}}
                                columnCount={columnCount}
                                rowWidth={300}
                                rowHeight={80}
                                dataSource={this.state.dataSource}
                                renderCell={this._renderGridCell}
                                sortable={this.state.sortable}
                            />
                        </ScrollView>
                    </View>
                    {this.state.longChecked === true ? (
                        <Fab
                            //duration={1000}
                            onComplete={this._onAnimationComplete.bind(this)}
                            onPress={this._onPress.bind(this)}
                            rippleColor={Colors.fadedWhite}
                            startAnimation={this.state.startAnimation}
                            style={styles.fabButton}
                            width={50}
                        >
                            <Icons
                                color={Colors.white}
                                name="md-add"
                                size={24}
                            />
                        </Fab>) : (<Fab
                        //  duration={1000}
                        onComplete={this._onAnimationComplete.bind(this)}
                        onPress={this._onPressComplete.bind(this)}
                        rippleColor={Colors.fadedWhite}
                        startAnimation={this.state.startAnimation}
                        style={styles.fabButton}
                        width={50}
                    >
                        <Icons
                            color={Colors.white}
                            name="md-checkmark-circle"
                            size={24}
                        />
                    </Fab>)}

                    <PopupDialog
                        dialogTitle={

                            <SearchInput
                                onChangeText={(term) => {
                                    this.searchUpdatedPop(term)
                                }}
                                style={searchBox.searchInputPop}
                                placeholder="Search"
                            />}
                        dialogStyle={{borderRadius: 50}}
                        dialogAnimation={'FadeAnimation'}
                        width={'80%'}
                        height={350}
                        ref={(fadeAnimationDialog) => {
                            this.popupDialog = fadeAnimationDialog;
                        }}
                    >
                        <View style={styles.pluginContainerStyle}>
                            <ScrollView style={{backgroundColor: 'transparent', padding: 5, borderRadius: 30,}}>
                                <SortableSudokuGrid
                                    rowWidth={330}
                                    ref={component => this._candidatesSudokuGrid = component}
                                    containerStyle={{
                                        backgroundColor: 'transparent',
                                        padding: 5,
                                        borderRadius: 30,
                                        position: 'relative',
                                    }}
                                    columnCount={4}
                                    dataSource={this.state.candidates}
                                    renderCell={this._renderCandidateCell}
                                    sortable={false}
                                />
                            </ScrollView>
                        </View>
                    </PopupDialog>
                </View>
            </View>
        );


    }
}
