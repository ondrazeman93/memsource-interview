import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import { GradientBackground, Header, Screen, ProjectItem } from '../../components';
import { color, spacing } from '../../theme';
import { NavigatorParamList } from '../../navigators';

const ProjectScreen = observer(({ navigation, route }: StackScreenProps<NavigatorParamList, 'project'>) => {
    return (
        <View testID="ProjectDetailScreen" style={styles.full}>
            <GradientBackground colors={['#422443', '#281b34']} />
            <Screen preset="fixed" backgroundColor={color.transparent}>
                <Header headerText={route.params.name} onLeftPress={() => navigation.goBack()} />
                <View style={styles.list}>
                    <ProjectItem {...route.params} />
                </View>
            </Screen>
        </View>
    );
});

const styles = StyleSheet.create<{ full: ViewStyle; list: ViewStyle }>({
    full: {
        flex: 1,
    },
    list: {
        marginTop: spacing[4],
        paddingHorizontal: spacing[4],
    },
});

export { ProjectScreen };
