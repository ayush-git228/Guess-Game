import React , { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Header} from "./components/Header";
import StartGame from "./screens/StartGame";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import { AppLoading } from "expo";     // It will prolong the screen to stay active untill our choice of work is completed(fetching fonts here)
import * as Font from "expo-font";

const fetchFonts = () => {
  return Font.loadAsync({                // Font.loadAsync returns a promise
    'open-sans': require("./assets/fonts/OpenSans-Regular.ttf"),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });    
} 

const App = () => {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);     //  Will keep the state of count the no. of rounds it'll take to complete the game
  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded)
  {
    return ( 
      <AppLoading startAsync={fetchFonts} onFinish={setDataLoaded(true)} onError={(error)=>console.log(error)} /> 
    );    
  } 

  const StartGameHandler = (selectedNUmber)=>{
    setUserNumber(selectedNUmber);
  }
  
  const ResetNewGame = ()=>{
    setGuessRounds(0);    // reseting prev. chance(if any)
    setUserNumber(null);  // set falsish number
  }

  const GameOverHandler = (numRounds) =>{
    setGuessRounds(numRounds);
  }

  let content = ( <StartGame  onStartGame= {StartGameHandler} /> );
  if(userNumber && guessRounds==0)      // Initially userNumber is undefined so this if statement don't run also guessRounds==0 means game is still running & it has not made a guessed(about no. of rounds) yet.
  {
    content = ( <GameScreen userChoice={userNumber} onGameOver={GameOverHandler} /> )
  } 
  else if(guessRounds>0)    // Had Made a guess
  {
    content = ( <GameOverScreen showNum={userNumber} showRounds={guessRounds} onRestart={ResetNewGame} /> )
  }

  return (
    <View style={styles.container}>
      <Header title="Guess  Game" />
        {content}
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#005a71",
  },
});

// loadAsync: A Method that allow us to load fonts and inside this we pass an object which tells expo about the fonts we wish to load  
 // If we put this anywhere else it may not work as it might take time to load and probably on the first render cycle it "may fail".
// We will return AppLoading component as the data of our app if nothing is loaded till now
  // startAsync wants the operation we wish to operate first when we render this AppLoading component
  // Now onFinish runs when startAsync operation is done