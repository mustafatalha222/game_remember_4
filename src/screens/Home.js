import {
  Dimensions,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import { Wrapper } from "../components";
import { CONSTANTS, Images, styles } from "../utils";
import { useContext } from "react";
import { AppContext } from "../store";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const window = Dimensions.get("window");

export default function Home({ navigation }) {
  const { isEn, resetValues } = useContext(AppContext);

  useFocusEffect(
    useCallback(() => {
      resetValues();
    }, [])
  );

  return (
    <Wrapper
      showCorners={true}
      heading={"Sports Commentator"}
      backImg={Images.bg_home}
    >
      <View style={{ ...styles.centerScreen }}>
        <TouchableOpacity
          onPress={() => navigation.navigate(CONSTANTS.SCREENS.PLAY)}
        >
          <Image
            style={{ ...style.imageText }}
            source={isEn ? Images.home_start : Images.home2_start}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(CONSTANTS.SCREENS.SETTINGS)}
        >
          <Image
            style={{ ...style.imageText, ...style.mt20 }}
            source={isEn ? Images.home_setting : Images.home2_setting}
          />
        </TouchableOpacity>
      </View>
      <Image style={style.ball} source={Images.home_ball} />
      <Image style={style.mic} source={Images.home_mic} />
    </Wrapper>
  );
}

const style = StyleSheet.create({
  imageText: {
    width: 180,
    height: 75,
  },
  mt20: {
    marginTop: 20,
  },
  mic: {
    position: "absolute",
    left: window.width * 0.1,
    bottom: 0,
  },
  ball: {
    position: "absolute",
    right: window.width * 0.08,
    top: window.width * 0.07,
  },
});
