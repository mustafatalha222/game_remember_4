import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Colors, styles, LANG } from "../utils";
import { useContext } from "react";
import { AppContext } from "../store";

export default function Score({ navigation }) {
  const { lang, scores } = useContext(AppContext);

  return (
    <View style={{ backgroundColor: Colors.greyBg, ...styles.centerScreen }}>
      <StatusBar backgroundColor="black" />
      <View
        style={{
          ...styles.outlineBorder,
          backgroundColor: Colors.white,
          paddingVertical: 15,
          paddingHorizontal: 100,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={style.score}> {LANG[lang].score}</Text>
        </View>
        <View
          style={{
            ...styles.outlineBorder,
            marginTop: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ ...styles.subHead }}> {scores}</Text>
        </View>

        <TouchableOpacity
          style={{
            ...styles.outlineBorder,
            marginTop: 10,
            paddingHorizontal: 50,
            alignItems: "center",
          }}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ ...styles.subHead }}>{LANG[lang].menu}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  score: {
    fontSize: 25,
    fontWeight: "700",
    color: Colors.black,
  },
});
