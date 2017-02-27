import { StackNavigator } from "react-navigation"
import TabsNav from "./tabs"
import { SettingsStack, TopicAddStack, ProfileEditStack } from "./modals"

export default StackNavigator({
  Tabs: { screen: TabsNav },
  SettingsStack: { screen: SettingsStack },
  TopicAddStack: { screen: TopicAddStack },
  ProfileEditStack: { screen: ProfileEditStack },
}, {
  initialRouteName: "Tabs",
  headerMode: "none",
  mode: "modal"
})