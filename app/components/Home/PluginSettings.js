import React from 'react';
const {
    PureComponent,
    PropTypes
} = React;
import * as Animatable from 'react-native-animatable';
import {ScrollView, Image, StatusBar, View, Text, LayoutAnimation,
    Alert, Animated,TouchableOpacity,TouchableHighlight,TouchableWithoutFeedback,StyleSheet,} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {styles, searchBox} from './styles';


type State = {
    startAnimation: boolean,
}

type Props = {
    logout: Function,
}


export default class PluginSettings extends PureComponent<void, Props, State> {
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
            longCheckedPop:false,
            searchTerm: '',
            searchTermPop:'',
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
    }

    _onPress () {
    /*   this.setState({
            startAnimation: true
        });*/
        this.popupDialog.show();
         }
    _onPressComplete () {
        this.setState({longChecked:true});
        this.setState({longCheckedPop:false});
        this._onPressManagementButton();
    }
    render() {
        return (
            <View style={styles.homeContainer}>
                <View style={styles.homeComponentHolder}>
                  <Text style={{fontWeight: 'bold', marginTop: 80, color:'#000', fontSize:20}}>{this.props.text}</Text>

                </View>
            </View>
        );


    }
}
