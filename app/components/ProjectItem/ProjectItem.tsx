import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Project } from '../../models/project/project';
import { color, spacing } from '../../theme';

const ProjectItem = ({ name, sourceLang, targetLangs, status }: Project) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text>Name: </Text>
                <Text style={styles.text}>{name}</Text>
            </View>
            <View style={styles.row}>
                <Text>Source language: </Text>
                <Text style={styles.text}>{sourceLang}</Text>
            </View>
            <View style={styles.row}>
                <Text>Target languages: </Text>
                <View style={styles.row}>
                    {targetLangs.map((lang, index) => (
                        <Text key={index} style={styles.text}>
                            {lang}
                            {index < targetLangs.length - 1 ? ', ' : ''}
                        </Text>
                    ))}
                </View>
            </View>
            <View style={styles.row}>
                <Text>Status: </Text>
                <Text style={styles.text}>{status}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.palette.white,
        borderRadius: 10,
        padding: spacing[5],
    },
    row: {
        flexDirection: 'row',
    },
    text: {
        fontWeight: 'bold',
    },
});

export { ProjectItem };
