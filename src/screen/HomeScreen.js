import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import {Color, Strings} from '../theme';
import LargeLoadingButton from '../components/LoadingButton/LargeLoadingButton';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.mainContainer}>
                <AppStatusBar
                    backgroundColor={Color.colorPrimaryDark}
                    barStyle="light-content"
                />
                <View style={styles.container}>
                    <Text style={styles.textStyle}>You have successfully authenticate with firebase</Text>
                    <View style={styles.buttonContainer}>
                        <LargeLoadingButton
                            title={Strings.logout}
                            loading={this.state.loading}
                            onPress={() => navigation.replace('Login')}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Color.backgroundColor,
        flexDirection: 'column',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
    },
    textStyle: {
        fontSize: 20,
        fontWeight: '700',
        color: Color.colorPrimary,
    },
});

export default HomeScreen;
