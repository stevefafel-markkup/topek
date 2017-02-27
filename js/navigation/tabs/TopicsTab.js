import React from "react"
import { StackNavigator } from "react-navigation"
import Styles, { Color, Dims } from "../../styles"

import TopicsScreen from "../../screens/TopicsScreen"

export default TopicsStack = StackNavigator({
  Topics: { screen: TopicsScreen }
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