import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Wrapper } from "../components";
import { CONSTANTS, Images, styles, LANG } from "../utils";
import { useContext } from "react";
import { AppContext } from "../store";

const GroupImg = ({ image, onPress }) => (
  <View>
    <Image style={{ ...style.groupImg }} source={Images.group} />
    <TouchableOpacity style={{ ...style.innerImg }} onPress={onPress}>
      <Image source={image} />
    </TouchableOpacity>
  </View>
);

export default function Settings({ navigation }) {
  const {
    isEn,
    changeLang,
    lang,
    setisVibrate,
    isVibrate,
    isSound,
    setisSound,
  } = useContext(AppContext);

  const handleVolume = () => {
    setisSound(!isSound);
  };

  const handleVibro = () => {
    setisVibrate(!isVibrate);
  };

  const handleLang = () => {
    if (isEn) {
      changeLang(CONSTANTS.LANG.RU);
    } else {
      changeLang(CONSTANTS.LANG.EN);
    }
  };

  return (
    <Wrapper
      showCorners={true}
      heading={LANG[lang].settings}
      backImg={Images.bg_home}
    >
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <Image style={style.back} source={Images.back} />
      </TouchableWithoutFeedback>
      <View style={{ ...styles.centerScreen, ...styles.inlineItem }}>
        <GroupImg
          image={isSound ? Images.sound_on : Images.sound_off}
          onPress={handleVolume}
        />
        <GroupImg
          image={isVibrate ? Images.vibro_on : Images.vibro_off}
          onPress={handleVibro}
        />
        <GroupImg
          image={isEn ? Images.flag_en : Images.flag_ru}
          onPress={handleLang}
        />
      </View>
    </Wrapper>
  );
}

const style = StyleSheet.create({
  back: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  groupImg: {
    position: "relative",
    marginHorizontal: 10,
  },
  innerImg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
