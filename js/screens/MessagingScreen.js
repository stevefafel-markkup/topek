import React, { Component } from "react"
import { StyleSheet, View, Text, Button, StatusBar } from "react-native"
import { NavbarButton, ErrorHeader } from "../components"
import { connectprops, PropMap } from "react-redux-propmap"
import * as messagingActions from "../state/actions/messagingActions"
import { Field, FieldGroup, TouchableField } from "react-native-fields"
import Styles, { Color, Dims } from "../styles"

import { GiftedChat } from "react-native-gifted-chat"

class Props extends PropMap {
  map(props) {
    props.user = this.state.profile.user;
    props.recipient = this.ownProps.navigation.state.params.member;
    props.messageRoom = this.state.messaging.messageRoom;
    props.messages = this.state.messaging.messages;
    props.isLoading = this.state.messaging.isLoading;
    props.loadError = this.state.messaging.loadError;
    props.messagingStart = this.bindEvent(messagingActions.startOneToOneMessaging);
    props.messagingStop = this.bindEvent(messagingActions.stopMessaging);
    props.sendClicked = this.bindEvent(messagingActions.sendMessage);
  }
}

@connectprops(Props)
export default class TestScreen extends Component {

  static navigationOptions = {
    title: ({ state }) => state.params.member.name,
    header: (navigation, defaultHeader) => ({
      ...defaultHeader,
      right: <NavbarButton title="Done" color={Color.tint} onPress={() => navigation.goBack(null)} />
    })
  }

  constructor(props) {
    super(props);
    this.state = {messages: []};
    this.onSend = this.onSend.bind(this);
  }

  componentWillMount() {
    this.props.messagingStart(this.props.recipient.id);
  }

  componentWillReceiveProps(nextProps, nextState) {
    let mappedMsgs = [];
    if (nextProps.messages && nextProps.messages.size > 0) {
      nextProps.messages.map(msg => {
        mappedMsgs.push({
          _id: msg.id,
          text: msg.text,
          createdAt: msg.createdAt,
          user: {
            _id: msg.owner.id,
            name: msg.owner.name,
            avatar: msg.owner.avatar.valid && msg.owner.avatar.url
          }
        })
      })
    }

    this.setState({messages: mappedMsgs});
  }

  componentWillUnmount() {
    this.props.messagingStop();
  }

  onSend(messages = []) {

    // save server
    messages.map(msg => {
      this.props.sendClicked(msg.text)
    })
    
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  render() {
    return (
      <View style={Styles.screen}>
        <StatusBar barStyle="dark-content" />
        { this.props.loadError && <ErrorHeader text={this.props.loadError} /> }
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          user={{
            _id: this.props.user.id,
          }}
      />
      </View>
    )
  }
}

let styles = StyleSheet.create({
})
