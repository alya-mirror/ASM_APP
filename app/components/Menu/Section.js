

import React from 'react';
import ReactNative from 'react-native';
import styles from './styles';
import TouchButton from '../Core/TouchButton';
import Colors from '../../utils/Colors';

const {
    PureComponent,
    PropTypes
} = React;

const {
    View,
    Text,
    ScrollView,
} = ReactNative;

type Props = {
    items: Object,
    title: string
}

export default class Section extends PureComponent<void, Props, void> {
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape({
            icon: PropTypes.string,
            value: PropTypes.string.isRequired,
            label: PropTypes.string,
            onPress: PropTypes.func,
            onLongPress: PropTypes.func,
            active: PropTypes.bool,
            disabled: PropTypes.bool
        })),
        title: PropTypes.string
    };
    
    renderRow = (item, index) => {
        return (
            <View
                key={index}
                style={styles.sectionItem}
            >
                <View style={[ styles.sectionValue, item.active ? styles.sectionActiveItemContainer : {} ]}>
                    <Text style={[ styles.sectionFont, item.active ? styles.sectionActiveFont : {} ]}>
                        {item.value}
                    </Text>
                </View>
            </View>
        );
    };
    
    render () {
        const {items} = this.props;
        return (
            <ScrollView contentContainerStyle={styles.section}>
                {items && items.map((item, i) => {
                    if (item.disabled) {
                        return this.renderRow(item, i);
                    }
                    
                    return (
                        <TouchButton
                            key={i}
                            onLongPress={item.onLongPress}
                            onPress={item.onPress}
                            pressColor={Colors.fadedLightBlack}
                        >
                            {this.renderRow(item, i)}
                        </TouchButton>
                    );
                })}
            </ScrollView>
        );
    }
}
