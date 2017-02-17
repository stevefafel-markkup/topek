//import { merge, mergeWith } from "ramda"
import { StyleSheet } from "react-native"
import { Color, Dims, TextSize } from "./theme"
import BaseStyles from "./base"
import OverrideStyles from "./overrides"

//const styles = mergeWith(merge, BaseStyles, OverrideStyles)
const styles = Object.assign({}, BaseStyles, OverrideStyles)
 
export default StyleSheet.create(styles)
export { Color, Dims, TextSize }