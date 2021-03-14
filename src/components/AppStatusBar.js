import React from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';

const AppStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, {backgroundColor}]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

const BAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBar.currentHeight;

const styles = StyleSheet.create({
    statusBar: {
        height: BAR_HEIGHT,
    },
});

export default AppStatusBar;
