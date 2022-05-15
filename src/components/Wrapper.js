import {
  View,
  ImageBackground,
  StatusBar,
  Image,
  StyleSheet,
  Text,
} from "react-native";
import { Images, styles } from "../utils";

export default function Wrapper({ children, showCorners, heading, backImg }) {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <ImageBackground
        style={{ ...styles.imageBg }}
        source={backImg}
        resizeMode="cover"
      >
        {showCorners ? (
          <>
            <Image style={style.side1} source={Images.side1} />
            <Image style={style.side2} source={Images.side2} />
            <Image style={style.side3} source={Images.side3} />
            <Image style={style.side4} source={Images.side4} />

            <View style={{ ...styles.rowCenter }}>
              <Text style={{ ...styles.heading }}>{heading}</Text>
              {children}
            </View>
          </>
        ) : (
          children
        )}
      </ImageBackground>
    </View>
  );
}

const style = StyleSheet.create({
  side1: {
    position: "absolute",
    left: 0,
    top: 18,
  },
  side2: {
    position: "absolute",
    left: 40,
    top: 0,
  },
  side3: {
    position: "absolute",
    right: 40,
    bottom: 0,
  },
  side4: {
    position: "absolute",
    right: 0,
    bottom: 40,
  },
});
