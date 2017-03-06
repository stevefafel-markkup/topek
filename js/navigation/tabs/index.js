import React from "react"
import { TabNavigator, StackNavigator } from "react-navigation"
import { Platform } from "react-native"
import { TabIcon } from "../../components"
import Styles, { Color, Dims } from "../../styles"

import TopicsTab from "./TopicsTab"
import CalendarTab from "./CalendarTab"
import TasksTab from "./TasksTab"
import ActivityTab from "./ActivityTab"
import MeTab from "./MeTab"
import OrgTab from "./OrgTab"

const tabsOptions = {
    initialRouteName: "Topics",
    lazyLoad: false,
    tabBarPosition: "bottom",
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
  Topics: { screen: TopicsTab, navigationOptions: { tabBar: { label: "Topics", icon: (props) => (<TabIcon {...props} icon="analytics" />) }}},
  /*Calendar: { screen: CalendarTab, navigationOptions: { tabBar: { label: "Calendar", icon: (props) => (<TabIcon {...props} icon="calendar" />) }}},*/
  Tasks: { screen: TasksTab, navigationOptions: { tabBar: { label: "You", icon: (props) => (<TabIcon {...props} icon="contact" />) }}},
  Activity: { screen: ActivityTab, navigationOptions: { tabBar: { label: "Activity", icon: (props) => (<TabIcon {...props} icon="pulse" />) }}},
  Org: { screen: OrgTab, navigationOptions: { tabBar: { label: "Group", icon: (props) => (<TabIcon {...props} icon="contacts" />) }}},
  /*Me: { screen: MeTab, navigationOptions: { tabBar: { label: "Me", icon: (props) => (<TabIcon {...props} icon="contact" />) }}},*/
}, tabsOptions);
