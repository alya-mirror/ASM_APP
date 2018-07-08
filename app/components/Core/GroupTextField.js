
import React from 'react';
import ReactNative from 'react-native';
import TextField from 'react-native-md-textinput';
import Divider from './Divider';
import Colors from '../../utils/Colors';

const {
    PureComponent,
    PropTypes
} = React;

const {
    View,
    StyleSheet,
    Text,
} = ReactNative;

const styles = StyleSheet.create({
    textFieldContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    fullWidth: {
        flex: 1
    },
    validationError: {
        textAlign: 'right',
        marginRight: 10,
        color: Colors.primary,
        marginBottom: 10
    }
});

type Props = {
    autoFocus: boolean,
    containerStyle?: any,
    highlightColor: string,
    icon?: string,
    iconSize: number,
    keyboardType: string,
    onChangeText?: Function,
    placeholder: string,
    secureTextEntry: boolean,
    tintColor: string,
    secureTextEntry: boolean,
    warningMessage: string,
}

type State = {
    isFocused : boolean
}

/**
 * Material Design TextInput with warning message support
 * Example
 * ```
 *  <GroupTextField
 *      label={'placeholder'}
 *      onChangeText={'Function'}
 *      secureTextEntry
 *      value={'value'}
 *      warningMessage={'warning message'}
 *  />
 * ```
 */
export default class GroupTextField extends PureComponent<Props, Props, State> {
    static propTypes: Props = {
        /**  If true, focuses the input on componentDidMount. */
        autoFocus: PropTypes.bool,
        /**  container style */
        containerStyle: PropTypes.any,
        /** enum('default', 'email-address', 'numeric', 'phone-pad', 'ascii-capable', 'numbers-and-punctuation', 'url', 'number-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search') */
        keyboardType: PropTypes.string,
        /** The string that will be rendered before text input has been entered. */
        placeholder: PropTypes.string,
        /** If true, the text input obscures the text entered so that sensitive text like passwords stay secure. */
        secureTextEntry: PropTypes.bool,
        /** Divider is used between warning message and TextInput */
        isDivider: PropTypes.bool,
        /** warning message */
        warningMessage: PropTypes.string,
        /** A number representing the duration of floating label and underline animations in milliseconds. */
        duration: PropTypes.number,
        /** This string appears as the label. */
        label: PropTypes.string,
        /** This string represents the hex code, rgb, or rgba color of the TextInput label and underline when it is active/focused on. */
        highlightColor: PropTypes.string,
        /** This string represents the hex code, rgb, or rgba color of the TextInput label when it is inactive. */
        labelColor: PropTypes.string,
        /** This string represents the hex code, rgb, or rgba color of the TextInput underline when it is inactive. */
        borderColor: PropTypes.string,
        /** This string represents the hex code, rgb, or rgba color of the text entered in the TextInput. Note: If you set textFocusColor or textBlurColor, those colors will override this one during the corresponding state of the TextInput. */
        textColor: PropTypes.string,
        /** This string represents the hex code, rgb, or rgba color of the text entered in the TextInput when it is active/focused on. */
        textFocusColor: PropTypes.string,
        /** This string represents the hex code, rgb, or rgba color of the text entered in the TextInput when it is inactive. */
        textBlurColor: PropTypes.string,
        onFocus: PropTypes.func,
        /** Callback that is called when the text input is focused. */
        onBlur: PropTypes.func,
        /** Callback that is called when the text input is blurred. */
        onChangeText: PropTypes.func,
        /** The value to show for the text input.  */
        value: PropTypes.string,
        /** If true, it will render the "dense" input field which is smaller in height and has smaller font sizes. You can view more [here](https://material.google.com/components/text-fields.html#text-fields-input). */
        dense: PropTypes.bool,
        /** Style for TextInput  */
        inputStyle: PropTypes.object,
        /** Style for TextInput View  */
        wrapperStyle: PropTypes.object,
        /** Style for label  */
        labelStyle: PropTypes.object
    };
    
    static defaultProps: Props = {
        highlightColor: Colors.white,
        keyboardType: 'default',
        secureTextEntry: false,
        duration: 200,
        tintColor: Colors.grey,
        iconSize: 24,
        isDivider: true,
        dense: true,
        labelColor: Colors.white,
        textColor: Colors.white
    };
    
    state: State = {
        isFocused: false,
    };
    
    render () {
        const {
            warningMessage,
            isDivider,
        } = this.props;
        return (
            <View style={{marginTop: -10}}>
                <TextField
                    {...this.props}
                    borderColor={Colors.transparent}
                    inputStyle={{paddingLeft: -1, marginBottom: 5}}
                    labelStyle={{fontSize: 12}}
                    wrapperStyle={{marginHorizontal: 20}}
                />
                {
                    isDivider &&
                    <Divider style={{backgroundColor: Colors.fadedWhite}}/>
                }
                {
                    warningMessage &&
                    <Text style={styles.validationError}>
                        {warningMessage}
                    </Text>
                }
            </View>
        );
    }
}
