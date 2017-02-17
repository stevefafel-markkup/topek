import React, { Component } from "react"
import { StyleSheet, View, Text } from "react-native"
import { connect } from "react-redux"
import Styles, { Color, Dims } from "../styles"

function getState(state) {
  return { 
  }
}

function getActions(dispatch) {
  return {
  }
}

@connect(getState, getActions)
export default class MainScreen extends Component {
  static navigationOptions = {
    title: "Main"
  }

  render() {
    return (
      <View style={Styles.screen}>
        <Text>Content</Text>
      </View>
    );
  }
}

let styles = StyleSheet.create({
})
