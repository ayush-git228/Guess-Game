import React from 'react';
import {View, StyleSheet, Text, Button} from "react-native";

export const NumberContainer = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.number}>{props.children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        borderColor: "#FF8C00",
        borderWidth: 2,
        borderRadius: 10,
        padding: 16,
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    number:{
        color: "black",
        fontSize: 26,
    }
})
