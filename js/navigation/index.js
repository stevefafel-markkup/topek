import { StackNavigator } from "react-navigation"
import Styles, { Color, Dims } from "../styles"
import TabsNav from "./tabs"
import SettingsScreen from "../screens/SettingsScreen"

export default StackNavigator({
  Tabs: { screen: TabsNav },
  Settings: { screen: SettingsScreen }
}, {
  initialRouteName: "Tabs",
  headerMode: "screen",
  mode: "modal",
  navigationOptions: {
    header: (_, defaultHeader) => ({
      ...defaultHeader,
      style: Styles.navbar,
      titleStyle: Styles.navbarTitle,
      tintColor: Color.white
    })
  }
})