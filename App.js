import React from 'react';
import auth from '@react-native-firebase/auth';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './src/screen/LoginScreen';
import OTPScreen from './src/screen/OTPScreen';
import SplashScreen from './src/screen/SplashScreen';
import HomeScreen from './src/screen/HomeScreen';


const RootStack = createStackNavigator();

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true,
        };
    }

    /**
     * When the App component mounts, we listen for any authentication
     * state changes in Firebase.
     * Once subscribed, the 'user' parameter will either be null
     * (logged out) or an Object (logged in)
     */
    async componentDidMount() {
        this.authSubscription = auth().onAuthStateChanged((user) => {
            console.log(user);
            this.setState({
                loading: false,
                user,
            });
        });
    }

    /**
     * Don't forget to stop listening for authentication state changes
     * when the component unmounts.
     */
    componentWillUnmount() {
        this.authSubscription();
    }


    RootStackScreen = () => (
        <RootStack.Navigator screenOptions={{headerShown: false, animationEnabled: false}}>
            <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
            <RootStack.Screen name="Login" component={LoginScreen}/>
            <RootStack.Screen name="OTP" component={OTPScreen}/>
            <RootStack.Screen name="HomeScreen" component={HomeScreen}/>
        </RootStack.Navigator>
    );

    render() {
        return (<NavigationContainer>{this.RootStackScreen()}</NavigationContainer>);
    }
}
