import React from 'react';
import ReactNative from 'react-native';
import Card from '../Core/Card';
import Avatar from '../Core/Avatar';
import Colors from '../../utils/Colors';
import Icon from '../Core/MaterialIcon';
import styles from './styles';

const {
    PureComponent,
    PropTypes
} = React;

const {
    Image,
    View,
    Text
} = ReactNative;

type Props = {
    avatarImage: Object,
    image: Object,
    name: string,
    username: string,
    time: string,
    city: string,
    message: string,
}

/**
 * Example - For more details, please refer Home Components
 *```
 *  <Post
 *      avatarImage={'<Image />'}
 *      city={'string'}
 *      image={'<Image />'}
 *      message={'string'}
 *      name={'string'}
 *      time={'string'}
 *      username={'string'}
 *  />
 *```
 */
export default class Post extends PureComponent<void, Props, void> {
    static propTypes: Props = {
        /** Avatar image source */
        avatarImage: PropTypes.any,
        /** Content  Image source */
        image: PropTypes.any,
        /** Full Name of user */
        name: PropTypes.string,
        /** username of user */
        username: PropTypes.string,
        time: PropTypes.string,
        city: PropTypes.string,
        message: PropTypes.string,
    };
    
    render () {
        const {
            avatarImage,
            image,
            name,
            username,
            time,
            city,
            message,
        } = this.props;
        return (
            <Card style={styles.postContainer}>
                <View style={styles.postHeader}>
                    <Avatar
                        borderColor={Colors.transparent}
                        borderWidth={0}
                        image={<Image source={avatarImage} />}
                        size={30}
                    />
                    <View style={styles.postHeaderNameContainer}>
                        <Text style={styles.postHeaderName}>{name}</Text>
                        <Text style={styles.postHeaderHandlerName}>{username}</Text>
                    </View>
                    <View style={styles.postHeaderLocationContainer}>
                        <Text style={styles.postHeaderTimeAgo}>{time} ago</Text>
                        <Text style={styles.postHeaderCityInfo}>in {city}</Text>
                    </View>
                    <Icon
                        color={Colors.grey}
                        name="place"
                        size={18}
                        style={styles.alignSelf}
                    />
                </View>
                <Image
                    resizeMode={'stretch'}
                    source={image}
                    style={{height: 150}}
                />
                <View
                    style={styles.postContentContainer}>
                    <Text style={styles.postContentText}>
                        {message}
                    </Text>
                    <Icon
                        color={Colors.grey}
                        name="arrow-forward"
                        size={16}
                        style={styles.alignSelf}
                    />
                </View>
            </Card>
        );
    }
}
