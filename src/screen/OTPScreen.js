import React, {Component} from 'react';
import {Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import {Color, Dimension, Fonts, Strings} from '../theme';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import Toast from 'react-native-simple-toast';
import LargeLoadingButton from '../components/LoadingButton/LargeLoadingButton';
import auth from '@react-native-firebase/auth';

class OTPScreen extends Component {
    pinInput = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            showOTP: true,
            code: '',
            mobile: '',
            mobileError: false,
            mobileErrorMessage: '',
            otp: '',
            screenHeight: 0,
            timer: 10,
            showTimer: false,
            confirmResult: null,
        };
    }

    componentDidMount = () => {
        let mobile = '';
        let confirmResult = null;
        if (this.props.route.params !== undefined) {
            mobile = this.props.route.params.item;
            confirmResult = this.props.route.params.result;
            if (mobile !== null) {
                console.log(mobile);
                console.log(confirmResult);
                this.setState({mobile: mobile, confirmResult: confirmResult});
            }
        }
    };

    onContentSizeChange = (contentWidth, contentHeight) => {
        this.setState({screenHeight: contentHeight});
    };

    sendVerifyOTP = async () => {
        this.setState({loading: true});
        const {mobile} = this.state;
        let phoneNo = '+91 ' + mobile;
        await auth().signInWithPhoneNumber(phoneNo)
            .then((confirmResult) => {
                console.log(confirmResult);
                this.setState({confirmResult});
                this.showToast('OTP Resend Successfully');
            }).catch((error) => {
                const {code, message} = error;
                console.log(code);
                console.log(error);
            });
    };

    verifyOTP = async () => {
        this.setState({loading: true});
        const {confirmResult, otp} = this.state;
        confirmResult.confirm(otp)
            .then((user) => {
                console.log(user);
                this.props.navigation.replace('HomeScreen');
            }).catch((error) => {
            const {code, message} = error;
            console.log(error);
        });
    };

    startTimer = () => {
        this.setState({showTimer: true});
        this.interval = setInterval(
            () => this.setState((prevState) => ({timer: prevState.timer - 1})),
            1000,
        );
    };

    componentDidUpdate() {
        if (this.state.timer === 0) {
            clearInterval(this.interval);
            this.setState({showTimer: false, timer: 60});
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    resendVerifyOTP = () => {
        this.startTimer();
        this.sendVerifyOTP();
    };

    showToast = (message) => {
        Toast.showWithGravity(message, Toast.SHORT, Toast.BOTTOM);
    };

    render() {
        const {mobile} = this.state;
        let modifyMobile = mobile.replace(mobile.substring(3, 8), '*****');
        const scrollEnabled = this.state.screenHeight > Dimension.window.height;
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollView}
                            scrollEnabled={scrollEnabled} onContentSizeChange={this.onContentSizeChange}
                            showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                    <View>
                        <AppStatusBar
                            backgroundColor={Color.colorPrimaryDark}
                            barStyle="light-content"
                        />
                        <View style={styles.imageContainer}>
                            <Image
                                source={require('../assets/images/mail_box_img.png')}
                                style={styles.imageStyle}
                            />
                        </View>
                        <View style={styles.contentContainer}>
                            <Text style={styles.title}>{Strings.otpText}</Text>
                            <Text style={styles.subTitle}>{`Enter OTP send to mobile ${modifyMobile}`}</Text>
                            <View style={styles.inputStyle}>
                                <SmoothPinCodeInput
                                    ref={this.pinInput}
                                    cellStyle={{
                                        borderWidth: 2,
                                        borderRadius: 5,
                                        borderColor: Color.lightgray,
                                        backgroundColor: Color.white,
                                    }}
                                    cellStyleFocused={{borderColor: Color.colorPrimary}}
                                    codeLength={6}
                                    value={this.state.otp}
                                    onTextChange={otp => this.setState({otp})}
                                    onBackspace={() => console.log('No more back.')}
                                />
                                <Text style={styles.subTitle}>{Strings.notReceiveOTP}</Text>
                                {this.state.showTimer
                                    ?
                                    <Text style={[styles.subTitle, {fontSize: 18, fontWeight: 'bold'}]}>
                                        Resend after : {this.state.timer}
                                    </Text>
                                    :
                                    <TouchableOpacity onPress={() => this.resendVerifyOTP()}>
                                        <Text style={[styles.subTitle, {
                                            color: Color.colorPrimary,
                                            marginBottom: 10,
                                        }]}>
                                            {Strings.resendOTP}
                                        </Text>
                                    </TouchableOpacity>
                                }
                                <LargeLoadingButton
                                    title={Strings.verifyOTP}
                                    loading={this.state.loading}
                                    onPress={() => this.verifyOTP()}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    inputStyle: {
        width: '100%',
        paddingLeft: '10%',
        paddingRight: '10%',
        marginTop: 10,
    },
    container: {
        flex: 1,
        zIndex: 999999,
        backgroundColor: Color.white,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        height: 250,
        width: 250,
        marginTop: '10%',
    },
    title: {
        fontSize: 25,
        fontFamily: Fonts.primaryBold,
        marginTop: 10,
        color: Color.textColor,
    },
    containerStyle: {
        marginTop: 30,
    },
    subTitle: {
        fontSize: 14,
        fontFamily: Fonts.primarySemiBold,
        marginTop: 10,
        color: Color.graylight,
        textAlign: 'center',
        marginLeft: '10%',
        marginRight: '10%',
    },
});

export default OTPScreen;
