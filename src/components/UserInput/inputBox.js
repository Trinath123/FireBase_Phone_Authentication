import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Color from '../../theme/Color';
import Font from '../../theme/Fonts';


function InputBox(props) {
    const [hasFocus, sethasFocus] = useState(false);
    const onFocus = () => {
        sethasFocus(true);
    };
    const inputElementRef = useRef(null);
    const onBlur = () => {
        sethasFocus(false);
    };
    useEffect(() => {
        inputElementRef.current.setNativeProps({
            style: {fontFamily: Font.primaryRegular},
        });
    });
    return (
        <View style={styles.textInputContainer1}>
            <View
                style={props.error ? [styles.textInputContainer, {borderColor: Color.red}] : [styles.textInputContainer, props.containerStyle]}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={props.onChangeText}
                    value={props.value}
                    placeholder={props.placeholder}
                    secureTextEntry={props.secureTextEntry}
                    autoCorrect={props.autoCorrect}
                    autoCapitalize={props.autoCapitalize}
                    returnKeyType={props.returnKeyType}
                    placeholderTextColor={props.placeholderTextColor}
                    keyboardType={props.keyboardType}
                    maxLength={props.maxLength}
                    editable={props.editable}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    ref={inputElementRef}
                />
            </View>
            <View style={styles.textInputContainer2}>
                <View
                    style={[hasFocus ? styles.focusedTextInput : styles.borderText, props.style, props.error ? styles.errorTextInput : null]}
                />
                {props.errorMessage
                    ?
                    (
                        <View>
                            <Text style={styles.error}>{props.errorMessage}</Text>
                        </View>
                    )
                    :
                    null
                }
            </View>
        </View>
    );

}

InputBox.propTypes = {};
InputBox.defaultProps = {};

const styles = StyleSheet.create({
    textInputContainer: {
        display: 'flex',
        flexDirection: 'column',
        borderWidth: 1,
        height: 45,
        borderColor: Color.silver,
        borderRadius: 10,
        justifyContent: 'center',
        width: '100%',
        backgroundColor: Color.white,
        color: Color.textColor,
    },
    textInputContainer1: {
        display: 'flex',
        flexDirection: 'column',
        height: 60,
        width: '100%',
    },
    textInputContainer2: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        borderColor: Color.red,
        height: 5,
    },
    textInput: {
        fontSize: 16,
        color: Color.textColor,
        fontFamily: Font.primaryRegular,
        paddingLeft: 15,
        justifyContent: 'center',
    },
    focusedTextInput: {
        fontSize: 20,
        color: Color.textColor,
        fontFamily: Font.primaryRegular,
        paddingLeft: 15,
        borderColor: Color.red,
        justifyContent: 'center',
    },
    errorTextInput: {
        fontSize: 20,
        color: Color.textColor,
        fontFamily: Font.primaryRegular,
        paddingLeft: 15,
        borderColor: Color.red,
        justifyContent: 'center',
    },
    error: {
        fontSize: 10,
        color: Color.red,
        fontFamily: Font.primaryRegular,
        paddingLeft: 15,
        paddingTop: 10,
        justifyContent: 'center',
    },
    borderText: {
        borderColor: Color.red,
    },
});


export default InputBox;
