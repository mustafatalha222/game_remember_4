import React, { Component } from "react";
import {
  Animated,
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { AppContext } from "../../store";
import Constants from "../../utils/Constants";
import { Audio } from "expo-av";

const ANIMATION_END_X = Dimensions.get("window").width;
const NEGATIVE_END_X = ANIMATION_END_X * -1;

export class AnimatedEmoji extends Component {
  static contextType = AppContext;
  static defaultProps = {
    style: [],
    onAnimationCompleted: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      position: new Animated.Value(ANIMATION_END_X),
      isAnimationStarted: false,
      sound: null,
    };
  }

  getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  generateInputRanges = (start, end, count) => {
    const length = start - end;
    const segment = length / (count - 1);
    const results = [];
    results.push(start);
    for (let i = count - 2; i > 0; i--) {
      results.push(end + segment * i);
    }
    results.push(end);
    return results;
  };

  generateYOutputRange = (count) => {
    const results = [];
    for (let i = 0; i < count; i++) {
      results.push(Math.random() * 50);
    }
    return results;
  };

  generateScaleOutputRange = (count) => {
    const results = [];
    for (let i = 0; i < count; i++) {
      results.push(Math.random() + 1);
    }
    return results;
  };

  generateAnimation = () => {
    this._xAnimation = this.state.position.interpolate({
      inputRange: [NEGATIVE_END_X, 0],
      outputRange: [ANIMATION_END_X, 0],
    });

    let randomSize = this.getRandomInt(3) + 3;
    const inputRangeY = this.generateInputRanges(NEGATIVE_END_X, 0, randomSize);

    this._yAnimation = this._xAnimation.interpolate({
      inputRange: inputRangeY,
      outputRange: this.generateYOutputRange(randomSize),
    });

    randomSize = this.getRandomInt(2) + 2;
    const inputRangeScale = this.generateInputRanges(
      NEGATIVE_END_X,
      0,
      randomSize
    );

    this._scaleAnimation = this._xAnimation.interpolate({
      inputRange: inputRangeScale,
      outputRange: this.generateScaleOutputRange(randomSize),
      extrapolate: "clamp",
    });

    this._opacityAnimation = this._xAnimation.interpolate({
      inputRange: [
        NEGATIVE_END_X,
        (NEGATIVE_END_X / 4) * 3,
        (NEGATIVE_END_X / 4) * 2,
        NEGATIVE_END_X / 4,
        0,
      ],
      outputRange: [1, 1, 1, 0.8, 0.0],
    });

    this._rotateAnimation = this._xAnimation.interpolate({
      inputRange: [
        NEGATIVE_END_X,
        (NEGATIVE_END_X / 4) * 3,
        (NEGATIVE_END_X / 4) * 2,
        NEGATIVE_END_X / 4,
        0,
      ],
      outputRange: ["0deg", "-5deg", "0deg", "5deg", "0deg"],
    });
  };

  componentDidMount() {
    this.startAnimating();
  }

  startAnimating = () => {
    const { onAnimationCompleted, index } = this.props;
    this.generateAnimation();
    this.setState(
      {
        isAnimationStarted: true,
      },
      () => {
        Animated.timing(this.state.position, {
          duration: this.props.duration,
          toValue: -100,
          useNativeDriver: true,
        }).start(() => {
          this.setState({
            isAnimationStarted: false,
            position: new Animated.Value(ANIMATION_END_X),
          });
          onAnimationCompleted(index);
        });
      }
    );
  };

  getAnimationStyle = () => {
    if (this.state.isAnimationStarted) {
      return {
        transform: [
          { translateY: this._yAnimation },
          { translateX: this.state.position },
          { scale: this._scaleAnimation },
          { rotate: this._rotateAnimation },
        ],
        opacity: this._opacityAnimation,
      };
    }

    return {};
  };

  render() {
    const { style, name, image, navigation } = this.props;
    const { healths, sethealths, setscores, scores, isSound } = this.context;

    const PlayProper = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require("../../../assets/sounds/Proper.mp3")
      );
      this.setState({ sound: sound });
      await sound.playAsync();
    };

    const PlayWrong = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require("../../../assets/sounds/Wrong.mp3")
      );
      this.setState({ sound: sound });
      await sound.playAsync();
    };

    const handleEmojiClick = (emoji) => {
      if (emoji === "smiley") {
        isSound && PlayProper();
        setscores(scores + 1);
      } else {
        isSound && PlayWrong();
        sethealths(healths - 1);
        if (healths === 1) {
          navigation.replace(Constants.SCREENS.SCORE);
        }
      }
    };

    return (
      <Animated.View
        style={[styles.container, this.getAnimationStyle(), style]}
      >
        <TouchableWithoutFeedback onPress={() => handleEmojiClick(name)}>
          <Image
            style={{ transform: [{ rotate: "270deg" }], width: 30, height: 30 }}
            source={image}
          />
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: ANIMATION_END_X,
    transform: [{ translateX: ANIMATION_END_X }],
  },
});
