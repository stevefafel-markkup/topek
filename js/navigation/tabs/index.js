import React from "react"
import { TabNavigator } from "react-navigation"
import { Platform } from "react-native"
import TabIcon from "../../components/TabIcon"
import Styles, { Color, Dims } from "../../styles"

import TopicsScreen from "../../screens/TopicsScreen"
import CalendarScreen from "../../screens/CalendarScreen"
import TasksScreen from "../../screens/TasksScreen"
import ActivityScreen from "../../screens/ActivityScreen"
import MeScreen from "../../screens/MeScreen"

const tabsOptions = {
    lazyLoad: true,
    tabBarOptions: {
        inactiveTintColor: Color.tintInactive,
        activeTintColor: Color.tint,
        showIcon: true,
        showLabel: Platform.OS === "ios",
        style: {
          backgroundColor: "#FFF",
        },
        indicatorStyle: {
          borderBottomColor: Color.tint
        }
    },
    animationEnabled: false,
}

export default TabNavigator({
  Topics: { screen: TopicsScreen, navigationOptions: { tabBar: { label: "Topics", icon: (props) => (<TabIcon {...props} icon="analytics" />) }}},
  Calendar: { screen: CalendarScreen, navigationOptions: { tabBar: { label: "Calendar", icon: (props) => (<TabIcon {...props} icon="calendar" />) }}},
  Tasks: { screen: TasksScreen, navigationOptions: { tabBar: { label: "Tasks", icon: (props) => (<TabIcon {...props} icon="checkbox" />) }}},
  Activity: { screen: ActivityScreen, navigationOptions: { tabBar: { label: "Activity", icon: (props) => (<TabIcon {...props} icon="pulse" />) }}},
  Me: { screen: MeScreen, navigationOptions: { tabBar: { label: "Me", icon: (props) => (<TabIcon {...props} icon="contact" />) }}},
}, tabsOptions);
