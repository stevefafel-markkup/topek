import React, { Component } from "react"
import { StyleSheet, View, StatusBar, Text } from "react-native"
import { connect } from "react-redux"
import Nav from "./navigation"
import Styles from "./styles"
import LoginScreen from "./screens/LoginScreen"

function getState(state) {
  return { 
    isAuthenticated: state.auth.isAuthenticated
  }
}

@connect(getState, null)
class App extends Component {

  render() {

    if (!this.props.isAuthenticated)
      return <LoginScreen />

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
