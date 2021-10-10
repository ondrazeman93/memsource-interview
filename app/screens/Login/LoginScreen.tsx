import React, { useCallback, useEffect, useState } from 'react';
import { View, ViewStyle, TextInput, StyleSheet, Text, ActivityIndicator, TextStyle } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Button, GradientBackground, Screen } from '../../components';
import { color, spacing } from '../../theme';
import { NavigatorParamList } from '../../navigators';
import { useStores } from '../../stores';

interface FormValues {
    username: string;
    password: string;
}

const LoginScreen = observer(({ navigation }: StackScreenProps<NavigatorParamList, 'login'>) => {
    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<FormValues>({
        defaultValues: {
            username: 'ondra.zeman.93',
            password: 'N87pO0u%9Aq2M7hU$wvP',
        },
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { userStore } = useStores();
    const { user } = userStore;

    useEffect(() => {
        if (userStore.hasUser) {
            navigation.reset({
                index: 1,
                routes: [{ name: 'projects' }],
            });
        }
    }, [userStore]);

    const onSubmit: SubmitHandler<FormValues> = useCallback(async (data) => {
        setLoading(true);
        try {
            await userStore.loginUser(data.username, data.password);
        } catch (e) {
            console.log(e);
            setError(e.message);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (user && user.token) {
            navigation.reset({
                index: 1,
                routes: [{ name: 'projects' }],
            });
        }
    }, [user]);

    return (
        <View testID="LoginScreen" style={styles.full}>
            <GradientBackground colors={['#422443', '#281b34']} />
            <Screen style={styles.full} preset="scroll" backgroundColor={color.transparent}>
                <View style={styles.content}>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Username"
                                style={styles.input}
                                placeholderTextColor={color.black}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                testID="usernameInput"
                            />
                        )}
                        name="username"
                        defaultValue=""
                    />
                    {errors.username && <Text>This is required.</Text>}
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Password"
                                style={styles.input}
                                placeholderTextColor={color.black}
                                secureTextEntry
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                testID="passwordInput"
                            />
                        )}
                        name="password"
                        defaultValue=""
                    />
                    {errors.password && <Text>This is required.</Text>}
                    {loading ? (
                        <ActivityIndicator size="large" />
                    ) : (
                        <Button testID="loginButton" text="Login" onPress={handleSubmit(onSubmit)} />
                    )}
                    {!!error && (
                        <Text style={styles.error} testID="responseError">
                            Error: {error}
                        </Text>
                    )}
                </View>
            </Screen>
        </View>
    );
});

const styles = StyleSheet.create<{
    content: ViewStyle;
    error: TextStyle;
    full: ViewStyle;
    input: ViewStyle;
}>({
    content: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: spacing[4],
    },
    error: {
        color: color.error,
        fontSize: 14,
        marginTop: spacing[4],
        textAlign: 'center',
    },
    full: {
        flex: 1,
    },
    input: {
        borderColor: color.palette.white,
        borderStyle: 'solid',
        borderWidth: 1,
        color: color.palette.white,
        marginBottom: spacing[6],
        padding: spacing[4],
    },
});

export { LoginScreen };
