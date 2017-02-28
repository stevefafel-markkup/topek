import React, { Component } from "react"
import { StyleSheet, View, TouchableHighlight, Text } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import Styles, { Color, Dims } from "../styles"

export default class FieldButton extends Component {
  render() {
    const { title, onPress, disabled } = this.props

    let overlayStyle = {
      backgroundColor: disabled ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0)"
    }

    let textStyle = {
      color: disabled ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 255, 255, 1)"
    }

    return (<TouchableHighlight 
              underlayColor={this.props.color} 
              activeOpacity={0.6} 
              disabled={disabled}
              onPress={onPress} 
              style={[styles.button, {backgroundColor:this.props.color}]}>
              <View 
                style={[styles.overlay, overlayStyle]}>
                <Text 
                  style={[styles.buttonText, textStyle]}>
                  {title}
                </Text>
              </View>
          </TouchableHighlight>)
  }
}

FieldButton.propTypes = {
  title: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool,
  color: React.PropTypes.string
}

FieldButton.defaultProps = {
  disabled: false,
  color: Color.tint
}

let styles = StyleSheet.create({
  button: {
    padding: 0,
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 2
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    padding: 10
  },
  overlay: {
  }
})
