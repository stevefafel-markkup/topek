import React from "react"
import { StackNavigator } from "react-navigation"
import Styles, { Color, Dims } from "../../styles"

import ProfileScreen from "../../screens/ProfileScreen"

export default MeTab = StackNavigator({
  Me: { screen: ProfileScreen }
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
