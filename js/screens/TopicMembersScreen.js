
import React, { Component } from "react"
import { StyleSheet, View, Text, TouchableHighlight, ListView, TouchableOpacity, ActivityIndicator } from "react-native"
import { NavbarButton, ErrorHeader, AvatarImage, WorkingOverlay } from "../components"
import { connectprops, PropMap } from "react-redux-propmap"
import Immutable from "immutable"
import Ionicon from "react-native-vector-icons/Ionicons"
import { Field, FieldGroup, TouchableField } from "react-native-fields"
import Styles, { Color, Dims, TextSize } from "../styles"

import * as topicActions from "../state/actions/topicActions"

class Props extends PropMap {
  map(props) {
    props.members = this.state.topics.selectedTopicMembers;
    props.isOwner = this.state.topics.selectedTopic.owner.id == this.state.profile.user.id;
    props.isWorking = this.state.topics.isLoadingMembers;
    props.removeClicked = this.bindEvent(topicActions.removeMembersfromSelectedTopic);
  }
}

@connectprops(Props)
export default class TopicMembersScreen extends Component {

  static navigationOptions = {
    title: "Topic Members",
    header: ({ navigate, state }, defaultHeader) => ({
      ...defaultHeader,
      right: state.params && state.params.isOwner && (<NavbarButton title="Add" color={Color.tintNavbar} onPress={() => navigate("MemberSelectorStack")} />),
    })
  }

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => !Immutable.is(r1, r2)});
    this.state = {
      dataSource: ds.cloneWithRows(props.members.toArray())
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
        isOwner: this.props.isOwner
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!Immutable.is(this.props.members, nextProps.members)) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.members.toArray())
      });
    }
  }

  render() {
    return (
      <View style={Styles.screen}>
        <WorkingOverlay working={this.props.isWorking} />
        { this.props.loadError && <ErrorHeader text={this.props.loadError} /> }
        <ListView
          style={{paddingTop: 8}}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          renderSeparator={this._renderSeparator}
          removeClippedSubviews={false}
          enableEmptySections={true}
        />
      </View>
    )
  }

  _renderRow(member) {
    const {navigate} = this.props.navigation;
    var onPress = () => { 
    };
    return (
      <TouchableHighlight onPress={onPress} underlayColor="#eee">
        <View style={styles.row}>
          <AvatarImage user={member} background="dark" style={[styles.avatar]} />
          <View style={styles.memberNameContainer}>
            <Text style={styles.name}>{member.name}</Text>
            <Text style={styles.alias}>{"@" + member.alias}</Text>
          </View>
          {this.props.isOwner && this._removingMemberId != member.id &&
            <TouchableOpacity onPress={() => this._removeMember(member)}>
              <Ionicon name="ios-close-circle" size={28} color={Color.tint} />
            </TouchableOpacity>}
          {this.props.isOwner && this._removingMemberId == member.id &&
            <ActivityIndicator />}
        </View>
      </TouchableHighlight>
    );
  }

  _removingMemberId = null;

  async _removeMember(member) {
    this._removingMemberId = member.id;
    await this.props.removeClicked(member);
    this._removingMemberId = null;
  }

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={Styles.separator}
      />
    );
  }
}

let styles = StyleSheet.create({
  row: {
    paddingHorizontal: Dims.horzPadding,
    paddingVertical: 4,
    flexDirection: "row",
    flex: 1,
    alignItems: "center"
  },
  avatar: {

  },
  name: {
    fontSize: TextSize.normal,
    marginLeft: 6
  },
  alias: {
    fontSize: TextSize.normal,
    color: "#777",
    marginLeft: 6
  },
  memberNameContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  memberName: {
    marginLeft: 4
  },
  memberAlias: {
    color: Color.subtle,
    marginLeft: 4
  }
})
