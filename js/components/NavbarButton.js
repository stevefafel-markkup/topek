import React, { Component } from "react"
import { StyleSheet, TouchableOpacity, Text } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import Styles, { Color, Dims } from "../styles"

export default class NavbarButton extends Component {
  render() {
    const { icon, focused } = this.props
    const weight = this.props.active ? "600" : "400";
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Text style={[styles.text, {color: this.props.color, fontWeight: weight}]}>{this.props.title}</Text>
      </TouchableOpacity>)
  }
}

NavbarButton.propTypes = {
  onPress: React.PropTypes.func.isRequired,
  title: React.PropTypes.string.isRequired,
  color: React.PropTypes.string,
  active: React.PropTypes.bool
}

NavbarButton.defaultProps = {
  color: Color.tintNavbar,
  active: false
}

let styles = StyleSheet.create({
  text: {
    fontSize: 18,
    marginLeft: 8,
    marginRight: 8
  }
})
