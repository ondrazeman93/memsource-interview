import React, { ErrorInfo } from 'react';
import { Text, TextStyle, View, ViewStyle, ScrollView } from 'react-native';
import { color } from '../../theme';
import { Button } from '../../components';

const CONTAINER: ViewStyle = {
    alignItems: 'center',
    flex: 1,
    padding: 16,
    paddingVertical: 50,
    backgroundColor: color.background,
};

const ERROR_DETAILS_CONTAINER: ViewStyle = {
    width: '100%',
    maxHeight: '60%',
    backgroundColor: color.line,
    marginVertical: 15,
    paddingHorizontal: 10,
    paddingBottom: 15,
    borderRadius: 6,
};

const BTN_RESET: ViewStyle = {
    paddingHorizontal: 40,

    backgroundColor: color.primary,
};

const TITLE_ERROR: TextStyle = {
    color: color.error,
    fontWeight: 'bold',
    paddingVertical: 15,
};

const CONTENT_ERROR: TextStyle = {
    color: color.error,
    fontWeight: 'bold',
    paddingVertical: 15,
};

export interface ErrorComponentProps {
    error: Error;
    errorInfo: ErrorInfo;
    onReset(): void;
}

/**
 * Describe your component here
 */
export const ErrorComponent = (props: ErrorComponentProps) => {
    return (
        <View style={CONTAINER}>
            <Text style={TITLE_ERROR}>Error</Text>
            <View style={ERROR_DETAILS_CONTAINER}>
                <ScrollView>
                    <Text selectable style={CONTENT_ERROR}>
                        {props.error}
                    </Text>
                </ScrollView>
            </View>
            <Button style={BTN_RESET} onPress={props.onReset} text="Reset" />
        </View>
    );
};
