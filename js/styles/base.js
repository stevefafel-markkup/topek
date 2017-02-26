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

  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Color.separator
  },

  navbar: {
    backgroundColor: Color.tint
  },

  navbarTitle: {
    color: Color.tintNavbar
  }

}