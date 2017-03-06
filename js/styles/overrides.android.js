import { Color, Dims } from "./theme"

export default {
  navbar: {
    backgroundColor: "rgb(249, 249, 249)", //Color.tint,
    elevation: 0,
    paddingTop: 16,
    height: Dims.navbarHeight
  },

  navbarTinted: {
    backgroundColor: Color.tint,
    elevation: 0,
    paddingTop: 16,
    height: Dims.navbarHeight
  },

  navbarModal: {
    backgroundColor: Color.white,
    elevation: 0,
    paddingTop: 16,
    height: Dims.navbarHeight
  }
}