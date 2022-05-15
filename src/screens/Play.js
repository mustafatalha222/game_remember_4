import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { Wrapper, Animatedemoji } from "../components";
import { Images, styles, LANG } from "../utils";
import { useContext } from "react";
import { AppContext } from "../store";
import { useEffect } from "react";

export default function Play(prop) {
  const {
    lang,
    healths,
    scores,
    isPause,
    setisPause,
    isSound,
    PauseAudio,
    PlayAudio,
  } = useContext(AppContext);

  useEffect(() => {
    isSound && PauseAudio();
    return () => {
      isSound && PlayAudio();
    };
  }, []);

  const handlePause = () => {
    setisPause(!isPause);
  };

  return (
    <Wrapper backImg={Images.bg}>
      <Image style={{ ...style.commentator }} source={Images.commentator} />
      <Image style={{ ...style.message1 }} source={Images.message1} />
      <Image style={{ ...style.message2 }} source={Images.message2} />

      <View style={{ ...styles.inlineItem }}>
        <TouchableWithoutFeedback onPress={handlePause}>
          <Image
            style={{ ...style.pause, marginRight: 5 }}
            source={isPause ? Images.play : Images.pause}
          />
        </TouchableWithoutFeedback>
        <View
          style={{
            ...styles.outlineBorder,
            marginRight: 5,
            flexDirection: "row",
          }}
        >
          {[...Array(3).keys()].map((e) => (
            <View key={e}>
              {e + 1 <= healths ? (
                <Image
                  style={{ ...style.healths, marginRight: 3 }}
                  source={Images.healths}
                />
              ) : (
                <View style={{ width: 30 }}></View>
              )}
            </View>
          ))}
        </View>
        <View
          style={{
            ...styles.outlineBorder,
          }}
        >
          <Text style={{ ...styles.subHead }}>
            {" "}
            {LANG[lang].score} : {scores}
          </Text>
        </View>
      </View>
      {!isPause && <Animatedemoji {...prop} />}
    </Wrapper>
  );
}

const style = StyleSheet.create({
  commentator: {
    position: "absolute",
    bottom: 0,
  },
  message1: {
    position: "absolute",
    right: 100,
    bottom: 0,
  },
  message2: {
    position: "absolute",
    right: 40,
    bottom: 5,
  },
});
