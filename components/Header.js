import React from 'react';
import {View, StyleSheet, Text} from "react-native";

export const Header = (props) => {
    return (
        <View style={styles.header} >
            <Text style={styles.headerTitle}> {props.title} </Text>
        </View>
    )
}

const styles  = StyleSheet.create({
    header:{
        width:"100%",
        height: 90,
        paddingTop: 36,
        backgroundColor: "#09264A",
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle:{
        color: "white",
        fontSize: 29,
       /* fontFamily: "open-sans-bold",  */
    },
})