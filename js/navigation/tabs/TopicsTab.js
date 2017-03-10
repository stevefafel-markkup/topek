import React from "react"
import { StackNavigator } from "react-navigation"
import Styles, { Color, Dims } from "../../styles"

import TopicsScreen from "../../screens/TopicsScreen"
import TopicDetailsScreen from "../../screens/TopicDetailsScreen"
import TopicDetailsEditScreen from "../../screens/TopicDetailsEditScreen"
import TopicMembersScreen from "../../screens/TopicMembersScreen"

export default TopicsStack = StackNavigator({
  Topics: { screen: TopicsScreen },
  TopicDetails: { screen: TopicDetailsScreen },
  TopicDetailsEdit: { screen: TopicDetailsEditScreen },
  TopicMembers: { screen: TopicMembersScreen }
}, {
  headerMode: "screen",
  navigationOptions: {
    header: {
      style: Styles.navbar,
      titleStyle: Styles.navbarTitle,
      tintColor: Color.tintNavbar
    }
  }
});