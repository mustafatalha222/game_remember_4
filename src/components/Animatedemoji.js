import React, { Component } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import { Images } from "../utils";
import { AnimatedEmoji } from "./Emoji/AnimatedEmoji";

const randomEmojis = [
  Images.angry1,
  Images.angry2,
  Images.angry3,
  Images.angry4,
  Images.smiley1,
  Images.smiley2,
  Images.smiley3,
  Images.smiley4,
];

const nameEmojis = [
  "angry",
  "angry",
  "angry",
  "angry",
  "smiley",
  "smiley",
  "smiley",
  "smiley",
];

const WINDOW_HEIGHT = Dimensions.get("window").height;
const EMOJI_AMOUNT = 10;

export default class AnimationEmojis extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emojiArray: [],
    };

    this._emojis = {};
    this.emojiIndex = 0;
  }

  componentDidMount() {
    /**
     * Generate `EMOJI_AMOUNT` emojis for initial rendering
     */
    for (let i = 0; i < EMOJI_AMOUNT; i++) {
      this.generateEmoji();
    }
  }

  /**
   * Function to generate emoji
   */
  generateEmoji = () => {
    const { emojiArray } = this.state;
    const newEmojis = Object.assign(emojiArray, []);

    let index = Math.floor(Math.random() * Math.floor(8));
    const emoji = {
      key: this.emojiIndex,
      name: nameEmojis[index],
      image: randomEmojis[index],
      duration: Math.floor(Math.random() * Math.floor(6000)) + 4000,
      yPosition: WINDOW_HEIGHT * 0.7 + Math.random() * (WINDOW_HEIGHT * 0.5),
    };
    newEmojis.push(emoji);
    this.emojiIndex += 1;

    this.setState({ emojiArray: newEmojis });
  };

  onAnimationCompleted = (index) => {
    const { emojiArray } = this.state;
    let newEmojis = Object.assign(emojiArray, []);
    newEmojis = newEmojis.filter((e) => e.key !== index);
    this.setState({ emojiArray: newEmojis }, () => this.generateEmoji());
  };

  render() {
    let emojiComponents = this.state.emojiArray.map((emoji) => {
      return (
        <AnimatedEmoji
          key={emoji.key}
          index={emoji.key}
          ref={(ref) => (this._emojis[emoji.key] = ref)}
          style={{ bottom: emoji.yPosition }}
          name={emoji.name}
          image={emoji.image}
          duration={emoji.duration}
          onAnimationCompleted={this.onAnimationCompleted}
          {...this.props}
        />
      );
    });

    return <View style={styles.container}>{emojiComponents}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    transform: [{ rotate: "90deg" }],
  },
});
