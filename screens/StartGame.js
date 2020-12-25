import React, { useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard,
    Alert, Dimensions, ScrollView, KeyboardAvoidingView } from "react-native";
import {Card} from "../components/Card";
import {Input} from "../components/Input";
import {NumberContainer} from "../components/NumberContainer";
import {BodyText} from "../components/BodyText";
import {CustomButton} from "../components/CustomButton";

const StartGame = (props) => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);     // Manages state for has the user confirmed yet, just a final check before starting game.
    const [selectedNumber, setSelectedNumber] = useState('');   // To save the 'confirmed' value with which we are going ahead.
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get("window").width / 4);   // Initialize with default

    const numberInputHandler = (input)=>{
        setEnteredValue(input.replace(/[^0-9]/g,""));     // replace everything (g for globally) which is not(^) a no.(0-9) with " "(empty). 
    }

    const resetHandler = ()=>{
        setEnteredValue('');
        setConfirmed(false);
    }

    useEffect(() => {
        const updateLayout = () =>{
            setButtonWidth(Dimensions.get("window").width / 4);     // here width changes according to mode "it is in" after event listener called
        }
        Dimensions.addEventListener("change", updateLayout);
        return () => {
            Dimensions.removeEventListener("change", updateLayout);    
        }
    })   
    
    const confirmHandler = ()=>{
        const chosenNumber = parseInt(enteredValue);
        if( isNaN(chosenNumber) || chosenNumber <=0 || chosenNumber>99)    // This NaN is put b/c on not adding any value it also should send alert
        {   
            Alert.alert("Invalid Number!",
            "Enter a number between 1 and 99",     // For not considering 0
            [{text: "Okay", style: "cancel", onPress: resetHandler }])    // Alert is an object which has alert property containing all cool features.
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);    // The order of this line and line after it doesn't matter.
        setEnteredValue('');
        Keyboard.dismiss();
    }
   
    // Since we have called the setConfirmed in a func so whole component re-renders with confirmed as true and so the following if runs.
    let confirmedOutput;      // const declarations needs a initialization value.
    if(confirmed)
    {
        confirmedOutput = 
        <Card style={styles.confirmContainer}>
            <BodyText style={styles.subtitle} >Chosen Number</BodyText>
            <NumberContainer>{selectedNumber}</NumberContainer>
            {/* <Button title="START GAME" onPress = {() => props.onStartGame(selectedNumber)} />  */}
            <CustomButton onPress = {()=> props.onStartGame(selectedNumber)}> START GAME </CustomButton>
        </Card>
    }
 

    return(
    <ScrollView>
      <KeyboardAvoidingView behavior= "position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}} >
          <View style={styles.screen}>
            <BodyText style={styles.title}>Start New Game</BodyText>

            <Card style={styles.inputContainer}>
               
                <BodyText style={styles.subtitle} >Enter a number</BodyText>

                <Input style={styles.input} 
                    blurOnSubmit 
                    autoCapitalize ="none"      autoCorrect={false} 
                    keyboardType ="number-pad"  maxLength={2} 
                    value={enteredValue}        onChangeText={numberInputHandler}
                />

                <View style={styles.buttonContainer}>
                    <View style={{width: buttonWidth}}>
                        <Button title = "Reset" color="#990029" onPress={resetHandler} /> 
                    </View>
                    <View style={{width: buttonWidth}}>
                        <Button title = "Confirm" color="#092649" onPress={confirmHandler} /> 
                    </View>
                </View>

            </Card>
            {confirmedOutput}

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
    )

}


const styles  = StyleSheet.create({
    screen:{
        flex: 1,
        padding: 10,
        alignContent: "center",
        justifyContent: "center",
    },
    title:{
        color: "#f5f4f4",
        fontSize: 25,
    },
    subtitle:{
        fontSize: 22,
        color: "black",
    },
    inputContainer:{
        width: "80%",
        minWidth: 300,      /* overrule on smaller devices where 80% less than 300 */
        maxWidth: "80%",
        alignItems: "center",
        height: 300,
    },
    buttonContainer:{
        flexDirection : "row",
        width: "100%",
        justifyContent: "space-between",
        paddingTop: 12,
        paddingHorizontal: 12,
    },
    input:{
        width: 70,
        textAlign: "center",
        color: "black",
        fontSize: 26,
    },
    confirmContainer:{
        marginTop: 20,
        alignItems: "center",
    },
})

export default StartGame;






 // without useEffect this will also work but it is more nice to do some cleanup
/*  this cleanup func runs before effect and so it will clean any preset eventistener func */ 
// so we will have always have only one particular mode event listener running at a time and when mode changes then it re-render and then it changes

 /*
    button:{
        width: "40%",   can fail on smaller devices, here width is 40% of its parent Not the whole device 
        width: Dimensions.get("window").width / 4,   if we use screen here in android it does not consider the notification bar but here it will consider
        fontSize: 14,     /4 is to divide the two buttons here according to device width also width here is always total width of device 
        Now using width dynamically here still has 1 problem as on changing mode from landscape to portrait it uses width with the mode
        we start the device, it's means it is locked so we need to create a state for that and manage the state according to orientation) 
    },
*/
/* using inline styles and using state object we have update the state of width*/
/* position (in android padding is better) is set so that keyboard don't overlay input field & Offset is use to set how much vertically it should gonna slide up*/ 
// In NumberContainer function we have "props.children" which can be passed b/w opening and closing tags rather than the usual open tag.
/* marinVertical basically replaces marginBottom and marginTop */
// In confirmHandler all 3 functions are batched together to result in one render cycle.
// The setEnteredValue('') in confirmHandler will be queued by react and will only be processed the next time component is rendered.
// When the three functions will be batched together the next cycle will have the updated state of the selectedNumber.
// When there is no value as argument inside a function don't pass it like ()=>{} it won't work, simply type {}
// Keyboard is Not a component but an API.
// All input fields are string by default and so this is used in useState(''), we have to manually convert them into no.
// To validate that input entered should be number only and drop any non-number input.
// This function is basically set most for dropping .(decimal) numbers. 
// This function is needed b/c number-pad removes letters but not (.) in keyboard in android, in IOS it does.