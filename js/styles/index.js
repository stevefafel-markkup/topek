import { StyleSheet } from "react-native"
import { Color, Dims, TextSize } from "./theme"
import BaseStyles from "./base"
import OverrideStyles from "./overrides"
import { Theme } from "../react-native-fieldsX"

export { Color, Dims, TextSize }

let Styles = StyleSheet.create(Object.assign({}, BaseStyles, OverrideStyles))

Styles.setup = () => {
  Theme.setColor("tint", "#EC5C5B");
  Theme.setColor("border", "rgb(200, 200, 200)");
}

export default Styles;


