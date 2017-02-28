import React, { Component } from "react"
import { StyleSheet, View, Text, Button } from "react-native"
import { NavbarButton, AvatarImage } from "../components"
import { connectprops, PropMap } from "react-redux-propmap"
import Styles, { Color, Dims } from "../styles"

class Props extends PropMap {
  map(props) {
    props.user = this.state.profile.user;
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

    let avatarSource = require("../assets/images/circle-user-man-512.png")
    if (this.props.user.avatar.valid) {
      avatarSource = {
        uri: this.props.user.avatar.url
      }
    }

    return (
      <View style={Styles.screen}>

        <View>
          <AvatarImage 
            source={avatarSource}
            size={30}
            background="dark"
            style={{margin: 10}}
          />
        </View>

        <Button onPress={() => {navigate("Test")}} title="Next"></Button>
        <Button onPress={() => {navigate("SettingsStack")}} title="Settings"></Button>

        
      </View>
    )
  }
}

let styles = StyleSheet.create({
})
