import React from 'react';
import ReactNative from 'react-native';
import elevationPolyfill from '../../polyfill/Elevation';
import TouchButton from './TouchButton';
import Colors from '../../utils/Colors';

const {
    PureComponent,
    PropTypes
} = React;

const {
    View
} = ReactNative;

const styles = {
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 2,
        margin: 8,
    }
};

type Props = {
    children: Object,
    disabled: boolean,
    elevation: number,
    onPress: Function,
    overrides: Object,
    style: View.propTypes.style,
    theme: string
}

/**
 * Example
 *```
 *   <Card
 *    style={styles.thumbnailContainer}>
 *     <Image
 *        resizeMode={'cover'}
 *        source={source}
 *        style={styles.thumbnail}/>
 *   </Card>
 *```
 */
export default class Card extends PureComponent<Props, Props, void> {
    static propTypes = {
        /** Content of Card */
        children: PropTypes.node.isRequired,
        disabled: PropTypes.bool,
        /** Paper effect index */
        elevation: PropTypes.number,
        onPress: PropTypes.func,
        overrides: PropTypes.shape({
            backgroundColor: PropTypes.string,
            rippleColor: PropTypes.string
        }),
        /** Paper effect index */
        style: View.propTypes.style,
        theme: PropTypes.string
    };
    
    static defaultProps = {
        elevation: 2,
        disabled: false
    };
    
    render () {
        const {theme, overrides, elevation, disabled, onPress, children, style} = this.props;
        
        const cardStyle = (() => {
            return [
                styles.container, elevationPolyfill(elevation), theme && {
                    backgroundColor: Colors.white
                }, overrides && overrides.backgroundColor && {
                    backgroundColor: overrides.backgroundColor
                }, style
            ];
        })();
        if (!onPress || disabled) {
            return (
                <View style={cardStyle}>
                    {children}
                </View>
            );
        }
        return (
            <TouchButton
                {...this.props}
                style={cardStyle}
            >
                {children}
            </TouchButton>
        );
    }
}
