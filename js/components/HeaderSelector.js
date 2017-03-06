import React, { Component } from "react"
import { StyleSheet, TouchableOpacity, Text } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import Styles, { Color, Dims } from "../styles"

export default class HeaderSelector extends Component {
  render() {
    const { icon, focused } = this.props

    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Text style={[styles.text, {color: this.props.color}]}>{this.props.title}</Text>
      </TouchableOpacity>)
  }
}

NavbarButton.propTypes = {
  onPress: React.PropTypes.func.isRequired,
  title: React.PropTypes.string.isRequired,
  color: React.PropTypes.string
}

NavbarButton.defaultProps = {
  color: Color.tintNavbar
}

let styles = StyleSheet.create({
  text: {
    fontSize: 18,
    marginLeft: 8,
    marginRight: 8
  }
})
