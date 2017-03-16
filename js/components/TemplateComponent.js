import React, { Component } from "react"
import { StyleSheet, View } from "react-native"
import Styles, { Color, Dims, TextSize } from "../styles"

export default class TemplateComponent extends Component {
  render() {
    return (
      <View />
    )
  }
}

TemplateComponent.propTypes = {
  color: React.PropTypes.string
}

TemplateComponent.defaultProps = {
  color: "blue"
}

let styles = StyleSheet.create({
})
