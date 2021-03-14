import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Color from '../../theme/Color';

function Logo(props) {
    return (
        <View style={[styles.logoContainer, props.style]}>
            <Image
                style={styles.logo}
                source={require('../../assets/images/logo.png')}
            />
            {/*<Text style={styles.textNameStyle}>My Grocery Store</Text>*/}
        </View>
    );
}

const styles = StyleSheet.create({
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        width: '100%',
    },
    logo: {
        width: 200,
        height: 200,
    },
    textNameStyle: {
        fontSize: 14,
        color: Color.colorPrimary,
    },
});

export default Logo;
