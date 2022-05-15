import { StyleSheet, Dimensions } from "react-native";
import Colors from "./Colors";

const window = Dimensions.get("window");

export default StyleSheet.create({
  centerScreen: { alignItems: "center", justifyContent: "center", flex: 1 },
  rowCenter: { alignItems: "center", flex: 1 },
  imageBg: {
    flex: 1,
  },
  heading: {
    fontSize: 30,
    fontWeight: "700",
    color: Colors.black,
    position: "absolute",
    marginTop: window.height * 0.05,
  },
  subHead: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.black,
  },
  inlineItem: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  outlineBorder: {
    backgroundColor: Colors.greyish,
    borderWidth: 2,
    borderColor: Colors.bluish,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
