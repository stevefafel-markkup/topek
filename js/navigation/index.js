import { StackNavigator } from "react-navigation"
import TabsNav from "./tabs"
import { SettingsStack, TopicAddStack, ProfileEditStack, ProfileStack, MessagingStack, MemberSelectorStack } from "./modals"

export default StackNavigator({
  Tabs: { screen: TabsNav },
  SettingsStack: { screen: SettingsStack },
  TopicAddStack: { screen: TopicAddStack },
  ProfileEditStack: { screen: ProfileEditStack },
  ProfileStack: { screen: ProfileStack },
  MessagingStack: { screen: MessagingStack },
  MemberSelectorStack: { screen: MemberSelectorStack }
}, {
  initialRouteName: "Tabs",
  headerMode: "none",
  mode: "modal"
})
