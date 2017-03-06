import { StackNavigator } from "react-navigation"
import Styles, { Color, Dims } from "../styles"
import TabsNav from "./tabs"
import SettingsScreen from "../screens/SettingsScreen"
import TopicAddScreen from "../screens/TopicAddScreen"
import ProfileEditScreen from "../screens/ProfileEditScreen"

import MeScreen from "../screens/MeScreen"
import TestScreen from "../screens/TestScreen"

const modalOptions = {
  headerMode: "float",
  navigationOptions: {
    header: {
      style: Styles.navbarModal,
      titleStyle: Styles.navbarTitleModal,
      tintColor: Color.tint
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
  Settings: { screen: MeScreen },
  SecondScreen: { screen: TestScreen }
}, modalOptions);

export const ProfileEditStack = StackNavigator({
  Settings: { screen: ProfileEditScreen },
  SecondScreen: { screen: TestScreen }
}, modalOptions);