import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import Color from '../theme/Color';
import {Fonts} from '../theme';

class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    performTimeConsumingTask = async () => {
        return new Promise((resolve) =>
            setTimeout(() => {
                resolve('result');
            }, 3000),
        );
    };

    async componentDidMount() {
        const data = await this.performTimeConsumingTask();
        if (data !== null) {
            this.props.navigation.replace('Login');
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <AppStatusBar
                    backgroundColor="rgba(0,0,0,0)"
                    barStyle="dark-content"
                    visibleStatusBar={false}
                    translucent
                />
                <Image
                    style={styles.logo}
                    source={require('../assets/images/logo.png')}
                />
                <Text style={{color: Color.colorPrimaryDark, fontSize: 20, fontWeight: '500'}}>
                    FireBase Phone Authentication
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.white,
    },
    logo: {
        height: 300,
        width: 300,
    },
    bottomImage: {
        height: 150,
        width: 150,
        position: 'absolute',
        bottom: 15,
        right: 80,
    },
    textTitleStyle: {
        marginTop: 15,
        fontWeight: '800',
        color: Color.colorPrimary,
        fontFamily: Fonts.primaryBold,
        fontSize: 26,
    },
});

export default SplashScreen;
