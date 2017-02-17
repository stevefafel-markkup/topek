import React, { Component } from "react"
import { StyleSheet, View, StatusBar, Text } from "react-native"
import Nav from "./navigation"
import Styles from "./styles"

class App extends Component {

  render() {
    return (
      <View style={Styles.app}>
        <StatusBar
          translucent={false}
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle="dark-content"
          />
        <Nav />
      </View>
    )
  }
}

export default App
