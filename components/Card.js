import React from 'react';
import {StyleSheet, View} from "react-native";

export const Card = (props) => {
    return (
        <View style={{ ...styles.card, ...props.style }}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        shadowColor: "black",
        shadowOffset: {  width: 0, height: 2  },    /* shadowOffset is a object with height and width. Here shadow is a bit offset at the bottom but not at the right as width: 0*/
        elevation : 10,                            /* Much needed as shadow only works on ios */ 
        shadowOpacity: 0.5,
        shadowRadius: 8,        /* describe how sharp shadow is. If it is not defined shadow will be seen only where the offset is defined like here bottom*/
        backgroundColor: "white",             /* much needed too for the shadow effect so that it is not transparent*/
        padding: 10,
        borderRadius: 12,
    }
})

/* ... is used here b/c there will some card properties which will be specific to some particular screen and we just want to "add them" on the
existing card properties so what spread operator does is that it take the key-value pair and wrap that into an object(that's why 2 braces here.)
Then we passed "props.style"(changed style property) which is a prop as 2nd argument as it will override the key-value pair in 
"styles.card"(existing style property) with itself. So basically the changes outside this component which is present in the props.style
will also be merged into the styles.card and thus reflecting those changes in this component too. style in props.style is offcorse the name 
that we decide at the time of calling the props in higher component.
*/