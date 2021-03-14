import React, {Component} from 'react';
import {KeyboardAvoidingView, ScrollView, StyleSheet, View} from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import {Color, Strings} from '../theme';
import Logo from '../components/Logo';
import InputBox from '../components/UserInput/inputBox';
import LargeLoadingButton from '../components/LoadingButton/LargeLoadingButton';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            phone: '',
            password: '',
            fcm_id: '',
            mobileError: false,
            mobileErrorMessage: '',
            confirmResult: null,
        };
    }

    onChangeMobile = (text) => {
        this.resetState();
        this.setState({
            phone: text.replace(/[^0-9]/g, ''),
        });
    };

    login = async () => {
        this.setState({loading: true});
        const {phone} = this.state;
        let phoneNo = '+91 ' + phone;
        await auth().signInWithPhoneNumber(phoneNo)
            .then((confirmResult) => {
                console.log(confirmResult);
                this.setState({confirmResult});
                this.showToast('Mobile Register Successfully');
                this.props.navigation.replace('OTP', {item: phone, result: confirmResult});
            }).catch((error) => {
                const {code, message} = error;
                console.log(error);
            });
    };

    showToast = (message) => {
        Toast.showWithGravity(message, Toast.SHORT, Toast.BOTTOM);
    };

    resetState = () => {
        this.setState({
            mobileErrorMessage: '',
            mobileError: false,
            passwordErrorMessage: '',
            passwordError: false,
        });
    };

    render() {
        return (
            <View style={styles.mainContainer}>
                <AppStatusBar
                    barStyle="light-content"
                    backgroundColor={Color.colorPrimaryDark}
                />
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.container}>
                    <ScrollView
                        contentContainerStyle={styles.scrollview}
                        onContentSizeChange={this.onContentSizeChange}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps={'always'}>
                        <View>
                            <Logo style={{marginTop: 80, alignItems: 'center'}}/>
                            <View style={{marginTop: 10, margin: 20}}>
                                <InputBox
                                    keyboardType="numeric"
                                    placeholder={Strings.mobileHint}
                                    placeholderTextColor={Color.textColor}
                                    error={this.state.mobileError}
                                    value={this.state.phone}
                                    errorMessage={this.state.mobileErrorMessage}
                                    maxLength={10}
                                    onChangeText={(phone) => this.onChangeMobile(phone)}
                                />
                                <View style={styles.buttonContainer}>
                                    <LargeLoadingButton
                                        title={Strings.signin}
                                        loading={this.state.loading}
                                        onPress={this.login}
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Color.white,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        backgroundColor: Color.white,
        flexDirection: 'column',
        flexGrow: 1,
    },
    container: {
        flex: 1,
        zIndex: 99999999,
        width: '100%',
    },
    buttonContainer: {
        width: '100%',
        paddingTop: 15,
    },
});
export default LoginScreen;
