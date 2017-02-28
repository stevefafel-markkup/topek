import React, { Component } from "react"
import { StyleSheet, View, Text, Image, Animated } from "react-native"
import CachedImage from "react-native-cached-image"
import { Platform } from "react-native"
import Styles, { Color, Dims } from "../styles"

export default class AvatarImage extends Component {
  render() {

    let darkBg = Platform.OS === "ios" ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.0)";
    let lightBg = Platform.OS === "ios" ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.0)";

    const style = {
      width: this.props.size, 
      height: this.props.size, 
      borderRadius: Platform.OS === "ios" ? this.props.size/2 : 150,
      backgroundColor: this.props.background == "dark" ? darkBg : lightBg
    }

    return (<CachedImage
              source={this.props.source}
              style={[style, this.props.style]}
            />)
  }
}

AvatarImage.propTypes = {
  source: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.number
  ]).isRequired,
  size: React.PropTypes.number,
  background: React.PropTypes.string
}

AvatarImage.defaultProps = {
  size: 30,
  background: "light" // dark
}

let styles = StyleSheet.create({
})
