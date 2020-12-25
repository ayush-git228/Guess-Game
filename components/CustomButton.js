import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from "react-native";

export const CustomButton = (props) => {
    return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
        <View style={styles.button}>
           <Text style={styles.buttonText}>{props.children}</Text>
        </View>      
    </TouchableOpacity>  
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#09264A",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 20,
        borderColor: "black",
    },
    buttonText:{
        color: "white",
       /* fontFamily: "open-sans",  */
        fontSize: 18,
        textAlign: "center",
    }
})

{/* Now we don't want the press event for this button but for the component who uses this button so we want to forward this, inside onPress
we just have to pass a fitting function reference in the event like the OnPress here*/}