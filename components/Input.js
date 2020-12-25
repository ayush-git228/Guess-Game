import React from 'react';
import {TextInput, StyleSheet} from "react-native";

export const Input = (props) => {
    return (
        <TextInput {...props} style={{...styles.input, ...props.style}} />
    )
}

const styles = StyleSheet.create({
    input:{
        marginVertical: 10,
        height: 30,
        borderBottomColor: "grey",
        borderBottomWidth: 1,
    }
})

// We can just take the props and spread them on our component. What it does, it takes all the props we have and adds them to our component
// (TextInput) here as props. B/c we're forwarding our props to the component(TextInput here) we're using in our custom component(Input here).
// Now after this {...props} if we got another prop like style then the style will simply overrides the style in the {..props}
// This is needed b/c when we set up the style prop on our own such that it is dependent on the outside data then we want that this 
// changed data(style) to get reflected in our props. So now whatever comes in our custom component as props goes to the TextInput.