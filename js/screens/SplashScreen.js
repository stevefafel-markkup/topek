import React, { Component } from "react"
import { View, ActivityIndicator } from "react-native"
import Styles, { Color } from "../styles"

export default class SplashScreen extends Component {
  render() {
    return (
      <View style={Styles.screen}>
        <ActivityIndicator />
      </View>
    );
  }
}
