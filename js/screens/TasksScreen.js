import React, { Component } from "react"
import { StyleSheet, View, Text, Button } from "react-native"
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
    return (
      <View style={Styles.screen}>
        
      </View>
    )
  }
}

let styles = StyleSheet.create({
})
