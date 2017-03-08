import { StackNavigator } from "react-navigation"
import TabsNav from "./tabs"
import { SettingsStack, TopicAddStack, ProfileEditStack, ProfileStack, MessagingStack } from "./modals"

export default StackNavigator({
  Tabs: { screen: TabsNav },
  SettingsStack: { screen: SettingsStack },
  TopicAddStack: { screen: TopicAddStack },
  ProfileEditStack: { screen: ProfileEditStack },
  ProfileStack: { screen: ProfileStack },
  MessagingStack: { screen: MessagingStack }
}, {
  initialRouteName: "Tabs",
  headerMode: "none",
  mode: "modal"
})