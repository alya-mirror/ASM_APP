

import React from 'react';
import ReactNative from 'react-native';
import styles from './styles';
import Avatar from '../Core/Avatar';
import AppText from '../Core/AppText';
import Colors from '../../utils/Colors';

const {
    PureComponent,
    PropTypes,
} = React;

const {
    View,
    Image
} = ReactNative;

type Props = {
    image: Object,
    primaryText: string,
    secondaryText: string,
}

/**
 * Example
 *```
 *   <Profile
 *     image={<Image source={user.profileUrl} />}
 *     primaryText={'string'}
 *     secondaryText={'string'}
 *   />
 *```
 */
export default class Profile extends PureComponent<void, Props, void> {
    static propTypes = {
        /** Profile Image */
        image: PropTypes.shape({type: PropTypes.oneOf([ Image ])}).isRequired,
        /** Primary Display Message */
        primaryText: PropTypes.string.isRequired,
        /** Secondary Display Message */
        secondaryText: PropTypes.string,
    };
    
    render () {
        const {image, primaryText, secondaryText} = this.props;
        return (
            <View style={styles.profileContainer}>
                <Avatar
                    borderColor={Colors.transparent}
                    borderWidth={0}
                    image={image}
                    size={40}
                />
                <AppText style={styles.profilePrimaryText}>{primaryText}</AppText>
                <AppText style={styles.profileSecondaryText}>{secondaryText}</AppText>
            </View>
        );
    }
}
