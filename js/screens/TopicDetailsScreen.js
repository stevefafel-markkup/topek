
import React, { Component } from "react"
import { StyleSheet, View, Text, Button } from "react-native"
import { ToolbarButton, AvatarImage, ErrorHeader } from "../components"
import { connectprops, PropMap } from "react-redux-propmap"
import * as topicActions from "../state/actions/topicActions"
import { Field, FieldGroup, TouchableField } from "react-native-fields"
import ActionSheet from "react-native-actionsheet"
import WorkingOverlay from 'react-native-loading-spinner-overlay';
import Styles, { Color, Dims } from "../styles"

class Props extends PropMap {
  map(props) {
    props.topic = this.state.topics.selectedTopic;
    props.user = this.state.profile.user;
    props.isUpdating = this.state.topics.isUpdating;
    props.updateError = this.state.topics.updateError;
    props.deleteClick = this.bindEvent(topicActions.destroy);
  }
}

@connectprops(Props)
export default class TopicDetailsScreen extends Component {

  static navigationOptions = {
    title: "",
    header: ({state}, defaultHeader) => ({
      ...defaultHeader,
      right: state.params && state.params.rightHeaderButton
    })
  }

  componentDidMount() {
    if (this.isOwner) {
      const params = {
        rightHeaderButton: <ToolbarButton name="more" color={Color.tintNavbar} onPress={() => this.moreSheet.show()} />
      }
      this.props.navigation.setParams(params);
    }
  }

  render() {
    const topic = this.props.topic;

    if (!topic) {
      return (
        <View style={Styles.screenFields}>
          <ErrorHeader text="This topic has been deleted" />
        </View>
      )
    }

    return (
      <View style={Styles.screenFields}>
        <WorkingOverlay visible={this.props.isUpdating} />
        { this.props.updateError && <ErrorHeader text={this.props.updateError} /> }
        <View style={styles.caption}>
          <Text style={styles.captionTitle}>{topic.name}</Text>
          <View style={styles.ownerContainer}>
            <AvatarImage user={topic.owner} style={styles.ownerAvatar} />
            <Text style={styles.owner}>{topic.owner.alias}</Text>
          </View>
        </View>

        <FieldGroup title="Members">
          <TouchableField onPress={() => {}} accessory={true}>
            <View style={{flexDirection:"row"}}>
              <AvatarImage user={topic.owner} background="dark" style={[styles.ownerAvatar, {marginRight:2}]} />
              <AvatarImage user={null} background="dark" style={[styles.ownerAvatar, {marginRight:2}]} />
              <AvatarImage user={null} background="dark" style={[styles.ownerAvatar, {marginRight:2}]} />
              <AvatarImage user={null} background="dark" style={[styles.ownerAvatar, {marginRight:2}]} />
            </View>
          </TouchableField>
        </FieldGroup>

        {this._renderDetails()}

        {/*<View style={{flex: 1, flexDirection:"row", justifyContent: "flex-end", padding: 10}}>
          <ToolbarButton name="add" color={Color.subtle} onPress={() => {}} />
        </View>*/}

        <ActionSheet 
          ref={(c) => this.moreSheet = c}
          options={["Delete", "Cancel"]}
          cancelButtonIndex={1}
          destructiveButtonIndex={0}
          onPress={this._handleMore.bind(this)}
        />

      </View>
    )
  }

  _renderDetails() {
    let children = [];
    const topic = this.props.topic;
    if (topic.details) {
      topic.details.map((detail, i) => {
        children.push(<Field key={detail.type + i} text={detail.title} />)
      });
    }

    if (!this.isOwner && children.length == 0)
      return null;

    return (
      <FieldGroup title="Details" link={this.isOwner && "Add"}>
        {children}
        { this.isOwner && children.length == 0 ? <Field key={-1} text=" " /> : null }
      </FieldGroup>
    )
  }

  get isOwner() {
    return (this.props.topic.owner.id == this.props.user.id);
  }

  async _handleMore(index) {
    if (index == 0) {
      if (await this.props.deleteClick(this.props.topic.id))
        this.props.navigation.goBack(null);
    }
  }
}

let styles = StyleSheet.create({
  caption: {
    backgroundColor: Color.tint,
    paddingHorizontal: Dims.horzPadding,
    paddingTop: 20,
    paddingBottom: 25
  },
  captionTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "500"
  },
  ownerContainer: {
    flexDirection: "row",
    paddingTop: 10
  },
  ownerAvatar: {
  },
  owner: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFFCC",
    marginTop: 4,
    marginLeft: 4
  }
})
