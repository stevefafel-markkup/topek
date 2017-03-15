import { StyleSheet } from "react-native"
import { Color } from "./theme"

export default {
  app: {
    flex: 1
  },

  screen: {
    flex: 1,
    backgroundColor: Color.background
  },

  screenFields: {
    flex: 1,
    backgroundColor: Color.backgroundFields
  },

  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Color.separator
  },

  navbar: {
    backgroundColor: Color.tint,
    shadowColor: "transparent"
  },

  navbarTinted: {
    backgroundColor: Color.tint,
    shadowColor: "transparent"
  },

  navbarLarge: {
    backgroundColor: Color.tint,
    shadowColor: "transparent",
    height: 88
  },

  navbarTitle: {
    color: Color.tintNavbar
  },

  navbarModal: {
    backgroundColor: Color.white
  },

  navbarTitleModal: {
    color: "#000"
  }

}