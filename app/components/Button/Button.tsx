import * as React from 'react';
import { StyleProp, TouchableOpacity, TouchableOpacityProps, ViewStyle, StyleSheet, Text } from 'react-native';
import { color, spacing, typography } from '../../theme';

interface ButtonProps extends TouchableOpacityProps {
    text?: string;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}

const Button = (props: ButtonProps) => {
    // grab the props
    const { text, style: styleOverride, children, ...rest } = props;

    const content = children || <Text style={styles.textStyle}>{text}</Text>;

    return (
        <TouchableOpacity style={[styles.viewStyle, styleOverride]} {...rest}>
            {content}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        color: color.palette.white,
        fontFamily: typography.primary,
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    viewStyle: {
        alignItems: 'center',
        backgroundColor: color.palette.deepPurple,
        borderRadius: 4,
        justifyContent: 'center',
        paddingHorizontal: spacing[4],
        paddingVertical: spacing[4],
    },
});

export { Button };
