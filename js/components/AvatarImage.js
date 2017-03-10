import React, { Component } from "react"
import { StyleSheet, View, Text, Image, Animated } from "react-native"
import CachedImage from "react-native-cached-image"
import { Platform } from "react-native"
import Styles, { Color, Dims } from "../styles"

export default class AvatarImage extends Component {
  render() {

    const { source, user } = this.props;

    let darkBg = Platform.OS === "ios" ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.5)";
    let lightBg = Platform.OS === "ios" ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.5)";

    let initials = null;
    let avatarSource = source;
    if (avatarSource == null && user != null) {
      if (user.avatar && user.avatar.valid) {
        avatarSource = {
          uri: user.avatar.url
        }
      }
      else if (user.name) {
        let tokens = user.name.split(" ");
        initials = "";
        tokens.map(t => initials += t[0]);
      }
    }

    if (avatarSource == null)
      avatarSource = require("../assets/images/circle-user-man-512.png")

    const style = {
      width: this.props.size, 
      height: this.props.size, 
      borderRadius: Platform.OS === "ios" ? this.props.size/2 : 150,
      backgroundColor: this.props.background == "dark" ? darkBg : lightBg,
      padding: 0,
      flexDirection: "row"
    }

    if (initials) {

      const initialsStyle = {
        fontSize: this.props.size/2,
        color: this.props.background == "dark" ? "#666" : "#fff",
      }

      return (
        <View style={[style, styles.initialsContainer, this.props.style]}>
          <Text style={[styles.initials, initialsStyle]}>{initials}</Text>
        </View>)
    }

    return (
      <View style={[style, this.props.style]}>
        <CachedImage
          source={avatarSource}
          style={[style, this.props.style, styles.icon]}
        />
      </View>
    )
  }
}

AvatarImage.propTypes = {
  source: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.number
  ]),
  user: React.PropTypes.object,
  size: React.PropTypes.number,
  background: React.PropTypes.string
}

AvatarImage.defaultProps = {
  source: null,
  user: null,
  size: 35,
  background: "light" // dark
}

let styles = StyleSheet.create({
  icon: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "transparent"
  },
  initialsContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  initials: {
    color: "#666"
  }
})
