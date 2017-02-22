import React, { Component } from "react"
import { StyleSheet, View, Text, Button } from "react-native"
import { connectprops, PropMap } from "react-redux-propmap"
import ToolbarButton from "../components/ToolbarButton"
import Styles, { Color, Dims } from "../styles"

class Props extends PropMap {
  map(props) {
    props.isAuthenticated = this.state.auth.isAuthenticated;
  }
}

@connectprops(Props)
export default class MeScreen extends Component {

  static navigationOptions = {
    title: "Me",
    header: ({ state, setParams, navigate }) => ({
      right: <ToolbarButton name="settings" onPress={() => navigate("Settings")} />,
    })
  }

  render() {
    return (
      <View style={Styles.screen}>
        
      </View>
    )
  }
}

let styles = StyleSheet.create({
})
