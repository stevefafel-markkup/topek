import React, { Component } from "react"
import { StyleSheet, View, Text, Button } from "react-native"
import { NavbarButton } from "../components"
import { connectprops, PropMap } from "react-redux-propmap"
import { AuthActions } from "../state/actions"
import { Field, FieldGroup, TouchableField } from "react-native-fields"
import Styles, { Color, Dims } from "../styles"

class Props extends PropMap {
  map(props) {
    props.user = this.state.profile.user;
    props.isAuthenticated = this.state.auth.isAuthenticated;
    props.logoutClick = this.bindEvent(AuthActions.logout);
  }
}

@connectprops(Props)
export default class SettingsScreen extends Component {

  static navigationOptions = {
    title: "Settings",
    header: (navigation, defaultHeader) => ({
      ...defaultHeader,
      right: <NavbarButton title="Close" color={Color.tint} onPress={() => navigation.goBack(null)} />,
      visible: true
    })
  }

  render() {
    return (
      <View style={Styles.screenFields}>
        <FieldGroup>
          <Field text="TBD" />
        </FieldGroup>
      </View>
    )
  }
}

let styles = StyleSheet.create({
})
