import { useState, useEffect, useRef } from "react";
import { Audio } from "expo-av";

export default function useAudio() {
  const sound = useRef(new Audio.Sound());
  const [isPlaying, setisPlaying] = useState(false);

  const LoadAudio = async () => {
    try {
      const result = await sound.current.loadAsync(
        require("../../assets/sounds/Menu.mp3"),
        {},
        true
      );
      if (result.isLoaded === false) {
        console.log("Error Loading Audio");
      } else {
        PlayAudio();
      }
    } catch (error) {
      console.log("Error in Loading Audio");
    }
  };

  const PlayAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          sound.current.playAsync();
          sound.current.setIsLoopingAsync(true);
          setisPlaying(true);
        }
      } else {
        LoadAudio();
      }
    } catch (error) {
      setisPlaying(false);
    }
  };

  const PauseAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          sound.current.pauseAsync();
          setisPlaying(false);
        }
      }
    } catch (error) {
      setisPlaying(false);
    }
  };

  useEffect(() => {
    LoadAudio();
    return () => {
      sound.current.unloadAsync();
    };
  }, []);

  return {
    PlayAudio,
    PauseAudio,
    isPlaying,
  };
}
