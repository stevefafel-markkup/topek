import React, { Component } from "react"
import { StyleSheet, View } from "react-native"
import Styles, { Color, Dims } from "../styles"

export default class WorkingOverlay extends Component {
  render() {
    if (!this.props.working && !this.props.disable)
      return null;
    let bg = this.props.disable ? "rgba(0, 0, 0, 0.0)" : "rgba(0, 0, 0, 0.1)"
    return (
      <View style={[styles.component, {backgroundColor: bg}]}>
      </View>)
  }
}

WorkingOverlay.propTypes = {
  working: React.PropTypes.bool,
  disable: React.PropTypes.bool,
}

WorkingOverlay.defaultProps = {
  working: false,
  disable: false
}

let styles = StyleSheet.create({
  component: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0, 
    right: 0,
    zIndex: 10000
  }
})
