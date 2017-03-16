import React, { Component } from "react"
import { StyleSheet, View, StatusBar } from "react-native"
import { ToolbarTextButton, UserSelectListView } from "../components"
import { connectprops, PropMap } from "react-redux-propmap"
import { UserMap } from "../models"
import Styles, { Color, Dims, TextSize } from "../styles"

import { TopicActions } from "../state/actions"

class Props extends PropMap {
  map(props) {
    props.members = this.state.members.list;
    props.orgOwner = this.state.prefs.org.owner;
    props.currentUser = this.state.profile.user;
    props.topicMembers = this.state.topics.selectedTopicMembers;
    props.isWorking = this.state.topics.isLoadingMembers;
    props.saveClicked = this.bindEvent(TopicActions.addMembersToSelectedTopic);
  }
}

@connectprops(Props)
export default class MemberSelectorScreen extends Component {

  static navigationOptions = {
    title: "Select Members",
    header: ({ state, goBack }, defaultHeader) => ({
      ...defaultHeader,
      left: <ToolbarTextButton title="Cancel" disabled={state.params && state.params.working} onPress={() => goBack(null)} />,
      right: <ToolbarTextButton title="Add" active={true} disabled={!state.params || !state.params.valid} working={state.params && state.params.working} onPress={() => state.params.rightClick()} />,
      visible: true
    })
  }

  constructor(props) {
    super(props);
    this.membersToAdd = new UserMap();
  }

  componentDidMount() {
    this.props.navigation.setParams({
      valid: false,
      working: false,
      rightClick: () => this._saveMembers(),
    });
  }

  render() {
    const { members, orgOwner, currentUser } = this.props;

    // compile list of potential members
    // all members + owner - current user - existing users
    let users = members.set(orgOwner.id, orgOwner).delete(currentUser.id);
    this.props.topicMembers.map(member => {
      users = users.delete(member.id)
    })

    return (
      <View style={Styles.screen}>

        <StatusBar barStyle="dark-content" />
        { this.props.updateError && <ErrorHeader text={this.props.updateError} /> }
        
        <UserSelectListView
          users={users}
          onSelectedUsersChanged={(members) => this._onMembersChanged(members)}
          emptyMessage={"All members have been added"}
        />

      </View>
    )
  }

  async _saveMembers() {
    this.props.navigation.setParams({working: true});
    await this.props.saveClicked(this.membersToAdd);
    this.props.navigation.goBack(null);
  }

  _onMembersChanged(members) {
    this.props.navigation.setParams({valid: members.size > 0});
    this.membersToAdd = members;
  }
}

let styles = StyleSheet.create({
})
