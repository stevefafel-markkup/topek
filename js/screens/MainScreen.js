import React, { Component } from "react"
import { StyleSheet, View, Text, Button } from "react-native"
import { connectprops, PropMap } from "react-redux-propmap";
import * as authActions from "../state/actions/authActions"
import Styles, { Color, Dims } from "../styles"

class Props extends PropMap {
  map(props) {
    props.isAuthenticated = this.state.auth.isAuthenticated;
    props.logoutClick = this.bindEvent(authActions.logout);
  }
}

@connectprops(Props)
export default class MainScreen extends Component {

  static navigationOptions = {
    title: "Main"
  }

  render() {
    return (
      <View style={Styles.screen}>
        <Text>Content</Text>
        <Text>{"Authenticated: " + this.props.isAuthenticated}</Text>
        <Button
          onPress={this.props.logoutClick}
          color={Dims.tint}
          style={{color: "#FFF"}}
          title="Log Out"
        />
      </View>
    )
  }
}

let styles = StyleSheet.create({
})
