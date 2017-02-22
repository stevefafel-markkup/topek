import { StackNavigator } from "react-navigation"
import TabsNav from "./tabs"
import SettingsScreen from "../screens/SettingsScreen"

export default StackNavigator({
  Tabs: { screen: TabsNav },
  Settings: { screen: SettingsScreen }
}, {
  initialRouteName: "Tabs",
  headerMode: "screen",
  mode: "modal"
})