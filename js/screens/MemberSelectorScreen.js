import React, { Component } from "react"
import { StyleSheet, View, Text, StatusBar, ListView, TouchableHighlight } from "react-native"
import { AvatarImage, Toolbar, ToolbarTextButton, WorkingOverlay } from "../components"
import { connectprops, PropMap } from "react-redux-propmap"
import Immutable from "immutable"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import SearchBar from "react-native-search-box"
import Styles, { Color, Dims, TextSize } from "../styles"

import * as topicActions from "../state/actions/topicActions"

class Props extends PropMap {
  map(props) {
    props.members = this.state.members.list;
    props.isWorking = this.state.topics.isLoadingMembers;
    props.saveClicked = this.bindEvent(topicActions.addMembersToSelectedTopic);
  }
}

@connectprops(Props)
export default class MemberSelectorScreen extends Component {

  static navigationOptions = {
    title: "Select Members",
    header: ({ state, goBack }, defaultHeader) => ({
      ...defaultHeader,
      left: <ToolbarTextButton title="Cancel" disabled={state.params && state.params.working} onPress={() => goBack(null)} />,
      right: <ToolbarTextButton title="Add" active={true} working={state.params && state.params.working} onPress={() => state.params.save()} />,
      visible: true
    })
  }

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    this.checks = {}
    this.searchKeyword = ""
    this.state = {
      dataSource: ds.cloneWithRows(this._getAggregateData(this.props.members))
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({
        working: false,
        save: () => this._saveMembers(),
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!Immutable.is(this.props.members, nextProps.members)) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this._getAggregateData(nextProps.members))
      });
    }
  }

  render() {
    return (
      <View style={Styles.screen}>
        <StatusBar barStyle="dark-content" />
        <WorkingOverlay disabled={this.props.isWorking} />
        <SearchBar
          ref="searchbar"
          backgroundColor={Color.white}
          titleCancelColor={Color.tint}
          onChangeText={(k) => this._onSearchTextChange(k)}
          onCancel={() => this._onCancelSearch()}
        />
        <ListView
          style={{paddingTop: 0}}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          renderSeparator={this._renderSeparator}
          removeClippedSubviews={false}
          keyboardShouldPersistTaps="always"
          enableEmptySections={true}
        />
        <View style={styles.toolbarContainer}>
          <Toolbar align="left">
            <ToolbarTextButton 
              title="Select All" 
              onPress={() => this._checkAll()} />
          </Toolbar>
          <Toolbar align="right">
            <ToolbarTextButton 
              title="Select None" 
              onPress={() => this._checkNone()} />
          </Toolbar>
        </View>
      </View>
    )
  }

  _renderRow(rowData) {
    var onPress = () => { 
    };
    const { member, checked } = rowData;
    return (
      <TouchableHighlight onPress={() => this._checkMember(member.id)} underlayColor="#eee">
        <View style={styles.row}>
          <AvatarImage user={member} background="dark" style={[styles.avatar]} />
          <View style={styles.identity}>
            <Text style={styles.name}>{member.name}</Text>
            <Text style={styles.alias}>{"@" + member.alias}</Text>
          </View>
          {(checked)
            ? <MaterialIcon name="check-box" size={30} color={Color.tint} />
            : <MaterialIcon name="check-box-outline-blank" size={30} color={Color.tint} />}
        </View>
      </TouchableHighlight>
    );
  }

  async _saveMembers() {
    let membersToAdd = this.props.members.asImmutable();
    for (key in this.props.members.toJS()) {
      if (this.checks[key] === undefined || this.checks[key] == false) {
        membersToAdd = membersToAdd.delete(key)
      }
    }

    this.props.navigation.setParams({working: true});
    await this.props.saveClicked(membersToAdd);
    this.props.navigation.goBack(null);
  }

  _onSearchTextChange(keyword) {
    return new Promise((resolve, reject) => {
      console.log("_onHandleSearchTextChange:", keyword);
      this._performSearch(keyword);
      resolve();
    });
  }

  _onCancelSearch() {
    this._performSearch("");
  }

  _performSearch(keyword) {
    this.searchKeyword = keyword;
    this._updateListViewSource();
  }

  _checkMember(id) {
    this.checks[id] = !this.checks[id];
    this._updateListViewSource();
  }

  _checkAll() {
    for (key in this.props.members.toJS())
      this.checks[key] = true
    this._updateListViewSource();
  }

  _checkNone() {
    for (key in this.props.members.toJS())
      this.checks[key] = false
    this._updateListViewSource();
  }

  _updateListViewSource() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this._getAggregateData(this.props.members))
    })
  }

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={Styles.separator}
      />
    );
  }

  _getAggregateData(members) {
    let keyword = this.searchKeyword;
    keyword = keyword.toLowerCase();
    let agg = {};
    members.map(member => {
      if (member.name.toLowerCase().search(keyword) >= 0 || 
        member.alias.toLowerCase().search(keyword) >= 0) {
        agg[member.id] = {
          checked: this.checks[member.id] !== undefined ? this.checks[member.id] : false,
          member: member
        }
      }
    })
    return agg;
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
  identity: {
    flex: 1,
    flexDirection: "row",
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
  toolbarContainer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#bbb",
    height: 44,
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingTop: 6,
    paddingRight: 2
  }
})
