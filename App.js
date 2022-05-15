import { Home, Play, Score, Settings } from "./src/screens";
//Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppContext } from "./src/store";
import { useState } from "react";
import { CONSTANTS } from "./src/utils";
import { useAudio } from "./src/hook";
import { useEffect } from "react";

const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={CONSTANTS.SCREENS.HOME}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={CONSTANTS.SCREENS.HOME} component={Home} />
      <Stack.Screen name={CONSTANTS.SCREENS.PLAY} component={Play} />
      <Stack.Screen name={CONSTANTS.SCREENS.SCORE} component={Score} />
      <Stack.Screen name={CONSTANTS.SCREENS.SETTINGS} component={Settings} />
    </Stack.Navigator>
  );
};

export default function App() {
  const { isPlaying, PlayAudio, PauseAudio } = useAudio();
  const [lang, setlang] = useState(CONSTANTS.LANG.EN);
  const [isVibrate, setisVibrate] = useState(true);
  const isEn = lang === CONSTANTS.LANG.EN;
  const changeLang = (getlang) => {
    setlang(getlang);
  };

  const [scores, setscores] = useState(0);
  const [healths, sethealths] = useState(3);
  const [isPause, setisPause] = useState(false);
  const [isSound, setisSound] = useState(true);

  const resetValues = () => {
    setscores(0);
    sethealths(3);
    setisPause(false);
  };

  useEffect(() => {
    isSound ? PlayAudio() : PauseAudio();
  }, [isSound]);

  return (
    <NavigationContainer>
      <AppContext.Provider
        value={{
          isEn,
          changeLang,
          lang,
          isPlaying,
          PlayAudio,
          PauseAudio,
          setisVibrate,
          isVibrate,
          scores,
          setscores,
          healths,
          sethealths,
          resetValues,
          isPause,
          setisPause,
          isSound,
          setisSound,
        }}
      >
        <StackNavigator />
      </AppContext.Provider>
    </NavigationContainer>
  );
}
