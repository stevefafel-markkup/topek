import React from "react"
import { StackNavigator } from "react-navigation"
import Styles, { Color, Dims } from "../../styles"

import ActivityScreen from "../../screens/ActivityScreen"

export default ActivityStack = StackNavigator({
  Activity: { screen: ActivityScreen }
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