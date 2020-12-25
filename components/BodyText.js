import React from 'react';
import {Text, StyleSheet} from "react-native";

export const BodyText = (props) => { 
    return(
        <Text style={{...styles.body, ...props.style}}>{props.children}</Text> 
    )
}

const styles = StyleSheet.create({
    body:{
        fontSize: 20,
        marginVertical: 10,
        textAlign: "center",
       /* fontFamily: 'open-sans-bold',  */  /* react-native doesn't support "fontWeight" for custom fonts */
    },
})

