import React from "react"
import { StackNavigator } from "react-navigation"
import Styles, { Color, Dims } from "../../styles"

import TasksScreen from "../../screens/TasksScreen"
import ProfileScreen from "../../screens/ProfileScreen"
import TestScreen from "../../screens/TestScreen"

export default TasksTab = StackNavigator({
  Tasks: { screen: TasksScreen },
  Profile: { screen: ProfileScreen },
  Test: { screen: TestScreen }
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
