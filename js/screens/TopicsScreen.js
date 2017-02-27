import React, { Component } from "react"
import { StyleSheet, View, Text, Button, ListView, TouchableHighlight, RefreshControl } from "react-native"
import { ErrorHeader, ToolbarButton } from "../components"
import Immutable from "immutable"
import { connectprops, PropMap } from "react-redux-propmap"
import * as topicActions from "../state/actions/topicActions"
import Styles, { Color, Dims } from "../styles"

class Props extends PropMap {
  map(props) {
    props.isAuthenticated = this.state.auth.isAuthenticated;
    props.topics = this.state.topics.list;
    props.isRefreshing = this.state.topics.isRefreshing;
    props.loadError = this.state.topics.loadError;
    props.loadTopics = this.bindEvent(topicActions.load);
    props.refreshTopics = this.bindEvent(topicActions.load);
  }
}

@connectprops(Props)
export default class TopicsScreen extends Component {

  static navigationOptions = {
    title: "Topics",
    header: (navigation, defaultHeader) => ({
      ...defaultHeader,
      right: <ToolbarButton name="add" color={Color.tintNavbar} onPress={() => navigation.navigate("TopicAddStack")} />,
    })
  }

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => !Immutable.is(r1, r2)});
    this.state = {
      dataSource: ds.cloneWithRows(props.topics.toArray())
    };
  }

  componentDidMount() {
    // TBD this shouldn't be done here
    this.props.loadTopics();
  }

  componentWillReceiveProps(nextProps) {
    if (!Immutable.is(this.props.topics, nextProps.topics)) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.topics.toArray())
      });
    }
  }

  render() {
    return (
      <View style={Styles.screen}>
        { this.props.loadError && <ErrorHeader text={this.props.loadError} /> }
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          enableEmptySections={true}
          renderSeparator={this._renderSeparator}
          refreshControl={
            <RefreshControl
              refreshing={this.props.isRefreshing}
              onRefresh={this.props.refreshTopics}
            />
          }
        />
      </View>
    )
  }

  _renderRow(topic, sectionID, rowID, highlightRow) {
    const {navigate} = this.props.navigation;
    var onPress = () => { };
    return (
      <TouchableHighlight onPress={onPress} underlayColor="#eee">
        <View style={styles.row}>
          <Text style={styles.text}>
            {topic.name} 
          </Text>
        </View>
      </TouchableHighlight>
    );
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
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  text: {
    flex: 1,
    fontSize: 18,
    paddingRight: 20
  }
})
