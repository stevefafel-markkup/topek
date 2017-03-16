import React from "react"
import { StackNavigator } from "react-navigation"
import Styles, { Color, Dims } from "../../styles"

import ActivityScreen from "../../screens/ActivityScreen"
import HistoryScreen from "../../screens/HistoryScreen"

export default ActivityStack = StackNavigator({
  Activity: { screen: ActivityScreen },
  History: { screen: HistoryScreen }
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