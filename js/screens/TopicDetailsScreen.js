
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
    props.topic = this.ownProps.navigation.state.params.topic;
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
      right: state.params.rightHeaderButton
    })
  }

  componentDidMount() {
    const params = {
      rightHeaderButton: <ToolbarButton name="more" color={Color.tintNavbar} onPress={() => this.moreSheet.show()} />
    }
    this.props.navigation.setParams(params);
  }

  render() {
    const topic = this.props.topic;
    return (
      <View style={Styles.screen}>
        <WorkingOverlay visible={this.props.isUpdating} />
        { this.props.updateError && <ErrorHeader text={this.props.updateError} /> }
        <View style={styles.caption}>
          <Text style={styles.captionTitle}>{topic.name}</Text>
          <View style={styles.ownerContainer}>
            <AvatarImage user={topic.owner} style={styles.ownerAvatar} />
            <Text style={styles.owner}>{topic.owner.alias}</Text>
          </View>
        </View>
        <FieldGroup>
          <TouchableField text="Test Something" onPress={() => {}} />
        </FieldGroup>

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
    paddingBottom: 15
  },
  captionTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "500"
  },
  ownerContainer: {
    flexDirection: "row",
    paddingTop: 8
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
