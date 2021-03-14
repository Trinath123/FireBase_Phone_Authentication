import React from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Color from '../../theme/Color';
import Font from '../../theme/Fonts';


function LargeLoadingButton(props) {
    return (
        <View>
            {props.loading
                ?
                (<View
                    style={[
                        styles.buttonStyle,
                        {
                            paddingLeft: 30,
                            paddingRight: 30,
                            paddingTop: 7,
                            paddingBottom: 7,
                        },
                        props.style,
                    ]}>
                    <ActivityIndicator size="small" color="#ffffff"/>
                </View>)
                :
                (<TouchableOpacity
                    onPress={props.onPress}
                    style={[styles.buttonStyle, props.style]}>
                    <Text style={styles.buttonText}>{props.title}</Text>
                </TouchableOpacity>)
            }
        </View>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        display: 'flex',
        flexDirection: 'column',
        borderWidth: 0.5,
        borderColor: Color.colorPrimaryDark,
        borderRadius: 10,
        color: Color.white,
        backgroundColor: Color.colorPrimary,
        height: 50,
        flex: 1,
        width: '80%',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        shadowColor: Color.colorPrimaryDark,
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        elevation: 3,
    },
    buttonText: {
        color: Color.white,
        fontFamily: Font.primaryRegular,
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
    },
});
export default LargeLoadingButton;
