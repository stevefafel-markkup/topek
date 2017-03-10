
import React, { Component } from "react"
import { StyleSheet, View, Text, Button } from "react-native"
import { NavbarButton } from "../components"
import { connectprops, PropMap } from "react-redux-propmap"
import * as authActions from "../state/actions/authActions"
import { Field, FieldGroup, TouchableField } from "react-native-fields"
import Styles, { Color, Dims } from "../styles"

class Props extends PropMap {
  map(props) {
    props.user = this.state.profile.user;
  }
}

@connectprops(Props)
export default class TestScreen extends Component {

  static navigationOptions = {
    title: "Edit Details",
    header: (navigation, defaultHeader) => ({
      ...defaultHeader,
      right: <NavbarButton title="Add" color={Color.tintNavbar} onPress={() => navigation.navigate("TopicAddStack")} />,
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
