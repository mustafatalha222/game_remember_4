import { useEffect, useState } from "react";
import { Audio } from "expo-av";

export default function useEmojiClick() {
  const [sound, setSound] = useState();

  const PlayProper = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/Proper.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  };

  const PlayWrong = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/Wrong.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return {
    PlayProper,
    PlayWrong,
  };
}
