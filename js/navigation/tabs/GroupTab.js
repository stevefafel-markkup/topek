import React from "react"
import { StackNavigator } from "react-navigation"
import Styles, { Color, Dims } from "../../styles"

import GroupScreen from "../../screens/GroupScreen"
import OrgScreen from "../../screens/OrgScreen"
import OrgSwitchScreen from "../../screens/OrgSwitchScreen"

export default GroupTab = StackNavigator({
  Group: { screen: GroupScreen },
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
