import { StackNavigator } from "react-navigation"
import Styles, { Color, Dims } from "../styles"
import TabsNav from "./tabs"
import SettingsScreen from "../screens/SettingsScreen"
import TopicAddScreen from "../screens/TopicAddScreen"
import ProfileScreen from "../screens/ProfileScreen"
import ProfileEditScreen from "../screens/ProfileEditScreen"
import MessagingScreen from "../screens/MessagingScreen"
import MemberSelectorScreen from "../screens/MemberSelectorScreen"

import TestScreen from "../screens/TestScreen"

const modalOptions = {
  headerMode: "float",
  navigationOptions: {
    header: {
      style: Styles.navbarModal,
      titleStyle: Styles.navbarTitleModal,
      tintColor: Color.tint
    },
    cardStack: {
      gesturesEnabled: false
    }
  }
}

export const TopicAddStack = StackNavigator({
  TopicsAdd: { screen: TopicAddScreen },
  SecondScreen: { screen: TestScreen }
}, modalOptions);

export const SettingsStack = StackNavigator({
  Settings: { screen: SettingsScreen },
  SecondScreen: { screen: TestScreen }
}, modalOptions);

export const ProfileStack = StackNavigator({
  Profile: { screen: ProfileScreen },
  SecondScreen: { screen: TestScreen }
}, modalOptions);

export const ProfileEditStack = StackNavigator({
  Settings: { screen: ProfileEditScreen },
  SecondScreen: { screen: TestScreen }
}, modalOptions);

export const MessagingStack = StackNavigator({
  Messaging: { screen: MessagingScreen }
}, modalOptions);

export const MemberSelectorStack = StackNavigator({
  MemberSelector: { screen: MemberSelectorScreen }
}, modalOptions);