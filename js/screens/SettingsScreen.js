import React, { Component } from "react"
import { StyleSheet, View, Text, Button } from "react-native"
import { connectprops, PropMap } from "react-redux-propmap"
import * as authActions from "../state/actions/authActions"
import { ToolbarButton } from "../components"
import { Field, FieldGroup, TouchableField } from "react-native-fields"
import Styles, { Color, Dims } from "../styles"

class Props extends PropMap {
  map(props) {
    props.user = this.state.profile.user;
    props.isAuthenticated = this.state.auth.isAuthenticated;
    props.logoutClick = this.bindEvent(authActions.logout);
  }
}

@connectprops(Props)
export default class SettingsScreen extends Component {

  static navigationOptions = {
    title: "Settings",
    header: ({ state, setParams, goBack }) => ({
      left: null,
      right: <Button title="Done" onPress={() => goBack()} />,
    })
  }

  render() {
    return (
      <View style={Styles.screen}>
        <FieldGroup>
          <TouchableField text="Log Out" onPress={this.props.logoutClick} />
        </FieldGroup>
      </View>
    )
  }
}

let styles = StyleSheet.create({
})
