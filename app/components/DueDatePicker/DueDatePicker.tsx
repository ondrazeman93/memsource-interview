import React, { useEffect, useState } from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { color, spacing } from '../../theme';
import { STEP } from '../../screens';

interface DueDatePickerProps {
    visible: boolean;
    hideModal?: () => void;
    dates: number[];
    activeDueDate: number;
    filterData: (value: number) => void;
}

const DueDatePicker = ({ visible, hideModal, dates, activeDueDate, filterData }: DueDatePickerProps) => {
    const [selectedDueDate, setSelectedDueDate] = useState<number>(activeDueDate);

    useEffect(() => {
        if (visible) {
            setSelectedDueDate(activeDueDate);
        }
    }, [visible]);

    return (
        <Modal visible={visible} onRequestClose={hideModal} animated animationType="slide">
            <View style={styles.modal}>
                <TouchableOpacity onPress={() => filterData(selectedDueDate)}>
                    <Text style={styles.modalClose}>Filter</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={hideModal}>
                    <Text style={styles.modalClose}>Close</Text>
                </TouchableOpacity>
                <Picker
                    selectedValue={selectedDueDate}
                    onValueChange={(itemValue) => setSelectedDueDate(Number(itemValue))}
                >
                    {dates.map((date) => (
                        <Picker.Item key={date} label={String(date)} value={date} />
                    ))}
                </Picker>
                <Slider
                    minimumValue={dates[0]}
                    maximumValue={dates[dates.length - 1]}
                    step={STEP}
                    value={selectedDueDate}
                    onValueChange={(value) => setSelectedDueDate(value)}
                />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create<{
    modal: ViewStyle;
    modalClose: TextStyle;
}>({
    modal: {
        flex: 1,
        justifyContent: 'center',
        padding: spacing[4],
    },
    modalClose: {
        color: color.black,
    },
});

export { DueDatePicker };
