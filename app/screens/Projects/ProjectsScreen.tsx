import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo, View, ViewStyle, StyleSheet, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import { Button, GradientBackground, Header, Screen, ProjectItem, DueDatePicker } from '../../components';
import { color, spacing } from '../../theme';
import { useStores } from '../../stores';
import { NavigatorParamList } from '../../navigators';
import { Project } from '../../models/project/project';

export const STEP = 4;

const ProjectsScreen = observer(({ navigation }: StackScreenProps<NavigatorParamList, 'projects'>) => {
    const dueDates = Array.from(Array(40).keys()).map((k) => k * STEP);
    const [selectedDueDate, setSelectedDueDate] = useState<number>(0);
    const [modalVisible, setModalVisible] = useState(false);
    const { projectStore, userStore } = useStores();
    const { projects } = projectStore;

    useEffect(() => {
        async function fetchData() {
            await projectStore.getProjects(userStore.getUserToken);
        }
        fetchData();
    }, []);

    const filterData = useCallback(
        async (date: number) => {
            hideModal();
            setSelectedDueDate(date);
            await projectStore.getProjects(userStore.getUserToken, date);
        },
        [userStore, projectStore],
    );

    const renderItem = useCallback(({ item }: ListRenderItemInfo<Project>) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('project', item)} style={styles.item}>
                <ProjectItem {...item} />
            </TouchableOpacity>
        );
    }, []);

    const showModal = useCallback(() => {
        setModalVisible(true);
    }, []);

    const hideModal = useCallback(() => {
        setModalVisible(false);
    }, []);

    return (
        <View testID="ProjectListScreen" style={styles.full}>
            <GradientBackground colors={['#422443', '#281b34']} />
            <Screen preset="fixed" backgroundColor={color.transparent}>
                <Header headerText="Project list" />
                <Button text="Select due date" onPress={showModal} style={styles.button} />
                <FlatList
                    contentContainerStyle={styles.list}
                    data={[...projects]}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={renderItem}
                />
                <DueDatePicker
                    visible={modalVisible}
                    dates={dueDates}
                    activeDueDate={selectedDueDate}
                    hideModal={hideModal}
                    filterData={async (value) => await filterData(value)}
                />
            </Screen>
        </View>
    );
});

const styles = StyleSheet.create<{
    button: ViewStyle;
    full: ViewStyle;
    item: ViewStyle;
    list: ViewStyle;
}>({
    button: {
        marginTop: spacing[4],
    },
    full: {
        flex: 1,
    },
    item: {
        marginBottom: spacing[4],
    },
    list: {
        marginTop: spacing[4],
        paddingHorizontal: spacing[4],
    },
});

export { ProjectsScreen };
