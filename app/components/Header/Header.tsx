import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, Text } from 'react-native';
import { Button } from '../Button/Button';
import { color, spacing } from '../../theme';

interface HeaderProps {
    headerText?: string;
    onLeftPress?(): void;
    onRightPress?(): void;
    style?: StyleProp<ViewStyle>;
}

/**
 * Header that appears on many screens. Will hold navigation buttons and Screen title.
 */
const Header = (props: HeaderProps) => {
    const { onLeftPress, onRightPress, headerText } = props;

    return (
        <View style={styles.root}>
            {onLeftPress ? <Button text="Back" onPress={onLeftPress} /> : <View style={styles.placeholder} />}
            <View style={styles.titleMiddle}>
                <Text style={styles.title}>{headerText}</Text>
            </View>
            {onRightPress ? <Button text="Continue" onPress={onRightPress} /> : <View style={styles.placeholder} />}
        </View>
    );
};

const styles = StyleSheet.create({
    placeholder: {
        width: 32,
    },
    root: {
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: color.black,
        borderStyle: 'solid',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingBottom: spacing[5],
        paddingHorizontal: spacing[4],
        paddingTop: spacing[5],
    },
    title: {
        color: color.palette.white,
        textAlign: 'center',
    },
    titleMiddle: {
        flex: 1,
        justifyContent: 'center',
    },
});

export { Header };
