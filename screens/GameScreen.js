import React , { useState, useRef, useEffect } from 'react';
import {View, Text, StyleSheet, Alert, ScrollView, Dimensions} from "react-native";
import { Card } from '../components/Card';
import { NumberContainer } from '../components/NumberContainer';
import {CustomButton} from "../components/CustomButton";
//import Icon from "react-native-vector-icons/Ionicons";
//import { AntDesign } from '@expo/vector-icons'; 
import {BodyText} from "../components/BodyText";

const randomNumberGenerator  = (min, max, exclude) =>{
    min = Math.ceil(min);
    max = Math.floor(max);
    const ranNum = Math.floor(Math.random() * (max-min)) + min;
    if(ranNum === exclude)
    {
        return randomNumberGenerator(min, max, exclude);
    } 
    else{
        return ranNum;
    }
}

const renderListItem = (value, numOfRound)=>{
    <View key={value} style={styles.listItem}>     {/* we have setup logic for guess in currentLow so now using guess as unique id will not give trouble*/}
        <BodyText>#{numOfRound}</BodyText>
        <BodyText>{value}</BodyText>
    </View>
}

const GameScreen = (props) => {

    const initialGuess = randomNumberGenerator(1,100,props.userChoice);   // When it is called the first time this initial state will be set and initial state will not be chnaged b/c of this func call.
    const [currentGuess, setCurrentGuess] = useState(initialGuess);     // This initialGuess value changes with every render but useState initializes with one value only at the first cycle only.
    // Setted up the state of currentGuess with the above line.

    const [pastGuesses, setPastGuesses] = useState([initialGuess]);     // keep track of all the guesses made and the first guess made is passed as a initial value in list (the bottom most element of list)
    // const [rounds, setRounds] = useState(0);      // 0: on first render of the component

    const currentLow = useRef(1);
    const currentHigh = useRef(100);             // This initial values don't change when component re-renders as they simply detach themselves from the component one's initialized.

    const { userChoice, onGameOver } = props;

    useEffect(()=>{
        if(currentGuess === userChoice)     // Make exact guess(can't be the first chance as we exclude userChoice the initial time)
        {
            //onGameOver(rounds);          // It increments with every render.
            onGameOver(pastGuesses.length);   // length of pastGuesses array is no. of rounds
        }
    },[currentGuess, userChoice, onGameOver])    // second parameter is a dependency of the function defined in it. the values inside should comes from outside the useEffect
    // So now useEffect will only run when these 3 value changes 

    const nextGuessHandler = (direction)=>{
        // Wrong Guess Case 
        if( (direction === "lower" && currentGuess < props.userChoice) || (direction === "higher" && currentGuess > props.userChoice) )
        {
            Alert.alert("WRONG STEP!", "Don't you lie to me", [ {text: "Okay", style: "cancel"} ]);
            return;
        }
        if(direction==="lower")     // Computer should guess a no. lower than the current no.
        {   
            currentHigh.current = currentGuess;
        }
        else{
            currentLow.current = currentGuess + 1;    // since low->high has low included and high excluded we need to care about low
            // so by +1 we ensure that the new lower boundary which is included in the randomNumberGenerator below is one higher than the currentGuess which is false Guess & ultimately leads to this if block
        }   // This is done to remove condition of same no. guessed multiple times
        const nextNumber = randomNumberGenerator( currentLow.current, currentHigh.current, currentGuess );

        setCurrentGuess(nextNumber);    // So it will re-render the component and it will print the current(updated) Guess below.
        //setRounds( (currRounds) => currRounds + 1 );     // When we made a guess we want no. of rounds inc by 1
        setPastGuesses( (lastPastGuess) => [nextNumber, ...lastPastGuess])   // nextNumber first placed (order wise) in list so that the latest guess is on the top of the list
    }

    let listContainerStyle = styles.listContainer;
    if(Dimensions.get("window").width < 350)     // another way of dealing with dimensions, set according to width by storing styles in variables 
    {
        listContainerStyle = styles.listContainerBig;
    }
    
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Opponent's  Guess</Text>
            <NumberContainer><Text style={styles.subtitle}>{currentGuess}</Text></NumberContainer>

            <Card style={styles.buttonContainer}>        
                <CustomButton onPress ={nextGuessHandler.bind(this, "lower")} > 
                    LOWER
                </CustomButton>
                <CustomButton onPress ={nextGuessHandler.bind(this, "higher")} > 
                    HIGHER
                </CustomButton>
            </Card>
            <View style={listContainerStyle}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map( (guess, index) => renderListItem(guess, pastGuesses.length - index) )}
                </ScrollView>
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    screen:{
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    title:{
        color: "#f5f4f4",
        fontSize: 25,
    },
    subtitle:{
        color: "white",
    },
    buttonContainer:{
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: Dimensions.get("window").height > 600 ? 30 : 5,   /* set spacing according to height, we can also use a style */
        width: 300,
        maxWidth: "80%",
    },
    listContainerBig:{   // instead of creating this two classes we could have also done Dimensions.get("window").height > 350 ? "60%" : "80%"
        flex: 1,
        width: "80%",
    },
    listContainer:{     /* styling directly on scroolView doesn't work correctly in some cases */
        flex: 1,   // without using flex the scrollView wont work on android
        width: "60%",
    },
    list:{
       /* flex: 1,      /* It states: take the full space of that particular screen but not correctly fulfill the scroll part*/
        flexGrow: 1,   /* Now this is correct, b/c flexGrow takes care of that scroll part b/c it states "grow" your space if you needed */
        alignContent: "center",
        justifyContent: "flex-end",
    },
    listItem:{
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "60%",
    },
})

export default GameScreen;





/* <AntDesign name="caretdown" size={24} color="white" /> 
   <AntDesign name="caretup" size={24} color="white" />  */
/* Since we are adding new items as the first list item the first list item is our latest round so index 1 item is not our first or oldest item */
/* If we have passed index as 2nd argument it will make the index of latest round to be 1 but we want the oldest or bottomest round to be our first index round*/
/* ScrollView also uses flexbox like View internally */
/*  we could also use this styles in Dimensions.get("window") eg. in place of 600 */
/*  <Button title="LOWER" onPress ={nextGuessHandler.bind(this, "lower")} />
    <Button title="HIGHER" onPress ={nextGuessHandler.bind(this, "higher")} />
 */
/* Default position when setting width is left side shifted in flexbox */
// useRef: create an object, which we can bind to that our inputs so our input elements to get access to them in our jsx code.
// It does another thing as: it allow us to define a value which survives(not changed) during component re-renders.
// This useRefs generates objects which have a "current" property to it.
// useEffect allow us to run side effects or can say logic after every render cycle.
// .bind() is used in nextGuessHandler to preconfigure the argument passed.