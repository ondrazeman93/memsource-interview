import * as React from 'react';
import { View, Alert } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { StoryScreen, Story, UseCase } from '../../../storybook/views';
import { Header } from './Header';
import { color } from '../../theme';

declare let module;

const VIEWSTYLE = {
    flex: 1,
    backgroundColor: color.storybookDarkBg,
};

storiesOf('Header', module)
    .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
    .add('Behavior', () => (
        <Story>
            <UseCase noPad text="default" usage="The default usage">
                <View style={VIEWSTYLE}>
                    <Header headerText="Header" />
                </View>
            </UseCase>
            <UseCase noPad text="leftIcon" usage="A left nav icon">
                <View style={VIEWSTYLE}>
                    <Header headerText="Header" onLeftPress={() => Alert.alert('left nav')} />
                </View>
            </UseCase>
            <UseCase noPad text="rightIcon" usage="A right nav icon">
                <View style={VIEWSTYLE}>
                    <Header headerText="Header" onRightPress={() => Alert.alert('right nav')} />
                </View>
            </UseCase>
        </Story>
    ));
