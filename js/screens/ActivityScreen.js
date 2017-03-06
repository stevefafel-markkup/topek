import React, { Component } from "react"
import { StyleSheet, View, Text, ScrollView } from "react-native"
import { Header, AvatarImage } from "../components"
import { connectprops, PropMap } from "react-redux-propmap"
import { Field, FieldGroup, TouchableField, InputField, SwitchField, Form } from "../react-native-fieldsX"
import Styles, { Color, Dims } from "../styles"

import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons"
import IonIcon from "react-native-vector-icons/Ionicons"

class Props extends PropMap {
  map(props) {
    props.user = this.state.profile.user;
  }
}

@connectprops(Props)
export default class ActivityScreen extends Component {

  static navigationOptions = {
    header: (navigation, defaultHeader) => ({
      visible: false
    })
  }

  render() {
    return (
      <View style={Styles.screen}>
        <Header title="Activity" subtitle=" " />
        <ScrollView>
          <FieldGroup>
            {this._renderActivity("@dave added a new topic 'Volleyball club parent meeting for anyone wanting to travel to Harrisburg'", "2/8", "1:33p", true)}
            {this._renderActivity("@steve spread the love with numerous hugs and kisses", "3/1", "5:45a", false)}
            {this._renderActivity("@dave completed his tasks for 'Task list for club picnic in  March'", "3/7", "3:17a", true)}
          </FieldGroup>
        </ScrollView>
      </View>
    )
  }

  _renderActivity(text, date, time, isDave) {

    const { avatar } = this.props.user;

    let avatarSource = require("../assets/images/circle-user-man-512.png")
    if (avatar.valid && isDave) {
      avatarSource = {
        uri: avatar.url
      }
    }

    return (
      <Field>
        <View style={{flexDirection: "row"}}>
          <AvatarImage background="dark" size={30} source={avatarSource} />
          <Text style={{flex:1, fontSize:18, marginLeft: 12}}>{text}</Text>
          <View style={{flexDirection: "column", alignItems: "center", marginLeft: 20}}>
            <Text style={{fontSize: 11, color: "#555"}}>{date}</Text>
            <Text style={{fontSize: 11, color: "#555"}}>{time}</Text>
          </View>
        </View>
      </Field>
    )
  }
}

let styles = StyleSheet.create({
})
