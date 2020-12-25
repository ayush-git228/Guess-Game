import React from 'react';
import { Text, View, StyleSheet, Image, Dimensions, ScrollView } from "react-native";
import {BodyText} from "../components/BodyText";
import {CustomButton} from "../components/CustomButton";
import {Card} from "../components/Card";

const GameOverScreen = (props) => {
    return (
    <ScrollView>
        <View style={styles.screen}>

            <View style={styles.imageContainer}>
              <Image style={styles.image} 
                source={require('../assets/game-over-img.jpg')}
               
                resizeMethod="auto" />   
            </View>

            <View style={styles.Container}>
            <Card>
              <BodyText numberOfLines="1" style={styles.textContainer} >
                <Text style={styles.highlight}>
                    <Text style={styles.number} >{props.showRounds}</Text> ROUNDS 🎉 {"\n"} 
                    THE NO. WAS <Text style={styles.number}>{props.showNum}</Text>
                </Text>
              </BodyText>
              </Card>  
            </View>

            <CustomButton onPress={props.onRestart}> NEW GAME </CustomButton>
        </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
    },
    imageContainer:{    /* View element cannot take property of its child so if we don't decide width and height here it is NOT gonna take the one of its child */
        width: Dimensions.get("window").width * 0.7,
        height: Dimensions.get("window").width * 0.7,   /* here width is used deliberately b/c 70% of device height is definetely not we require */
        borderRadius: Dimensions.get("window").width * 0.7 / 2,
        borderWidth: 2,
        borderColor: "black",
        overflow: "hidden",      /* crops anything that goes outside the container */
        marginVertical: Dimensions.get("window").height / 30,  
    },
    number:{
        color: "purple",
        fontSize: 30,
    },
    Container:{
        marginHorizontal: 30,
        marginVertical: Dimensions.get("window").height / 30,  
    },
    textContainer:{
        textAlign: "center",
        fontSize: Dimensions.get("window").height < 400 ? 16 : 20,
    },
    image:{
        width: "100%",     /* image coming from web do not set the default width and image of image so we have to set the 2 property */
        height: "100%",
    },
    highlight:{
        color: "darkblue",
       /* fontFamily: "open-sans-bold",  */
    }
})

export default GameOverScreen;






/* source={{uri: "link to the web image"}} */ /*In this we have a property uri in an object* which has a link to the target page */ 
/* require also tells react-native what is the width and height of image so for effectively loading this image, for "local* files we use this */
/* <Button title="NEW GAME" onPress={props.onRestart} /> */
/* Text Component according to view size makes the text goes to next line if needed */
/* React Native does not inherit style property, like components inside view will not recieve the property of its parent view But text components
are an exception i.e. if a text component is inside a text component then it will recieve its property here Text component is inside BodyText */