import React, { Component } from "react"
import { StyleSheet, View, ActivityIndicator } from "react-native"
import Styles, { Color } from "../styles"

export default class SplashScreen extends Component {
  render() {
    return (
      <View style={styles.screen}>
        <ActivityIndicator />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Color.tint
  }
})