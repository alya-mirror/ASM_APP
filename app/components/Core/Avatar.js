
import React from 'react';
import ReactNative from 'react-native';
import Icon from './MaterialIcon';

const {
    PureComponent,
    PropTypes
} = React;

const {
    Image,
    View,
    StyleSheet,
    Text
} = ReactNative;

const styles = StyleSheet.create({
    container: {flex: 1}
});

type Props = {
    backgroundColor: string,
    borderColor: string,
    borderRadius: number,
    borderWidth: number,
    color: string,
    icon: string,
    image: Object,
    size: number,
    text: string,
    zIndex: number,
}

/**
 * Avatar component for logo and profile images
 * Example
 *```
 *   <Avatar
 *     borderColor={'color'}
 *     borderRadius={'number'}
 *     borderWidth={'number'}
 *     duration={'number'}
 *     fontColor={'color'}
 *     icon={'name of icon'}
 *     image={<Image source={require('../../../assets/avatar07.png')}/>}
 *     size={'number'}
 *   />
 *```
 */
export default class Avatar extends PureComponent<Props, Props, void> {
    static propTypes = {
        /** background color of Avatar */
        backgroundColor: PropTypes.string,
        /** border color of Avatar */
        borderColor: PropTypes.string,
        /** border radius of Avatar */
        borderRadius: PropTypes.number,
        /** border width of Avatar */
        borderWidth: PropTypes.number,
        /** font/icon color  of Avatar */
        color: PropTypes.string,
        /** icon name  of Avatar */
        icon: PropTypes.string,
        /** image source of Avatar */
        image: PropTypes.shape({type: PropTypes.oneOf([ Image ])}),
        /** size of Avatar */
        size: PropTypes.number,
        /** text of Avatar */
        text: PropTypes.string,
        /** zIndex of Avatar */
        zIndex: PropTypes.number,
    };
    
    static defaultProps:Props = {
        size: 40,
        color: '#ffffff',
        backgroundColor: '#4caf50',
        borderRadius: 40 / 2,
        borderColor: 'rgba(0,0,0,.1)',
        borderWidth: 1,
        zIndex: 0,
    };
    
    render () {
        const {props} = this;
        const {
            image,
            icon,
            size,
            color,
            backgroundColor,
            text,
            borderColor,
            borderWidth,
            zIndex
        } = props;
        
        let localStyles = StyleSheet.create({
            avatarStyle: {
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor,
                borderWidth,
                zIndex
            }
        });
        
        if (image) {
            return React.cloneElement(image, {
                style: {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    borderColor,
                    borderWidth,
                    zIndex
                }
            });
        }
        
        if (icon) {
            return (
                <View style={styles.container}>
                    <View style={localStyles.avatarStyle}>
                        <Icon
                            color={color}
                            name={icon}
                            size={0.6 * size}
                        />
                    </View>
                </View>
            );
        }
        
        if (text) {
            return (
                <View style={styles.container}>
                    <View style={localStyles.avatarStyle}>
                        <Text style={{color}}>{text}</Text>
                    </View>
                </View>
            );
        }
        return null;
    }
}
