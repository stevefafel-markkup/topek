import React, { Component } from "react"
import { StyleSheet, View, Text, Button } from "react-native"
import { NavbarButton } from "../components"
import { connectprops, PropMap } from "react-redux-propmap"
import * as authActions from "../state/actions/authActions"
import { InputField, Field, FieldGroup, TouchableField } from "react-native-fields"
import Styles, { Color, Dims } from "../styles"

class Props extends PropMap {
  map(props) {
    props.user = this.state.profile.user;
    props.isAuthenticated = this.state.auth.isAuthenticated;
    props.logoutClick = this.bindEvent(authActions.logout);
  }
}

@connectprops(Props)
export default class TopicAddScreen extends Component {

  static navigationOptions = {
    title: "Add a Topic",
    header: (navigation, defaultHeader) => ({
      ...defaultHeader,
      right: <NavbarButton title="Cancel" color={Color.tint} onPress={() => navigation.goBack(null)} />
    })
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    return (
      <View style={Styles.screenFields}>
        <FieldGroup>
          <InputField label="Title" />
          <TouchableField text="Save" onPress={() => goBack(null)} />
          {/*<TouchableField text="Next" onPress={() => navigate("SecondScreen")} />*/}
        </FieldGroup>
      </View>
    )
  }
}

let styles = StyleSheet.create({
})
