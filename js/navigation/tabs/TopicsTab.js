import React from "react"
import { StackNavigator } from "react-navigation"
import Styles, { Color, Dims } from "../../styles"

import TopicsScreen from "../../screens/TopicsScreen"
import TopicDetailsScreen from "../../screens/TopicDetailsScreen"

export default TopicsStack = StackNavigator({
  Topics: { screen: TopicsScreen },
  TopicDetails: { screen: TopicDetailsScreen }
}, {
  headerMode: "float",
  navigationOptions: {
    header: {
      style: Styles.navbar,
      titleStyle: Styles.navbarTitle,
      tintColor: Color.tintNavbar
    }
  }
});