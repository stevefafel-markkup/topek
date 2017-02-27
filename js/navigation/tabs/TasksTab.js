import React from "react"
import { StackNavigator } from "react-navigation"
import Styles, { Color, Dims } from "../../styles"

import TasksScreen from "../../screens/TasksScreen"
import TestScreen from "../../screens/TestScreen"

export default TasksTab = StackNavigator({
  Tasks: { screen: TasksScreen },
  Test: { screen: TestScreen }
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
