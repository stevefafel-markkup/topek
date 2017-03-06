import React from "react"
import { StackNavigator } from "react-navigation"
import Styles, { Color, Dims } from "../../styles"

import OrgScreen from "../../screens/OrgScreen"
import OrgSwitchScreen from "../../screens/OrgSwitchScreen"

export default OrgTab = StackNavigator({
  Org: { screen: OrgScreen },
  OrgSwitch: { screen: OrgSwitchScreen }
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
