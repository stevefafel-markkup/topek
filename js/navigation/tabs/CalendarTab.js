import React from "react"
import { StackNavigator } from "react-navigation"
import Styles, { Color, Dims } from "../../styles"

import CalendarScreen from "../../screens/CalendarScreen"

export default CalendarStack = StackNavigator({
  Calendar: { screen: CalendarScreen }
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