import React, { Component } from "react"
import { StyleSheet, View, Text, Button } from "react-native"
import { NavbarButton } from "../components"
import { connectprops, PropMap } from "react-redux-propmap"
import Styles, { Color, Dims } from "../styles"

class Props extends PropMap {
  map(props) {
    props.isAuthenticated = this.state.auth.isAuthenticated;
  }
}

@connectprops(Props)
export default class TasksScreen extends Component {

  static navigationOptions = {
    title: "Tasks"
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={Styles.screen}>
        <Button onPress={() => {navigate("Test")}} title="Next"></Button>
        <Button onPress={() => {navigate("Settings")}} title="Settings"></Button>
      </View>
    )
  }
}

let styles = StyleSheet.create({
})
