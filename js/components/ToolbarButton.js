import React, { Component } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import Styles, { Color, Dims } from "../styles"

import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons"
import IonIcon from "react-native-vector-icons/Ionicons"
import EvilIcon from "react-native-vector-icons/EvilIcons"
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons"

export default class ToolbarButton extends Component {
  render() {

    var icon;

    switch (this.props.name) {
      case "arrow-back": {
        icon = (<IonIcon name="ios-arrow-back" size={30} color={this.props.tint} style={[styles.icon]} />);
        break;
      }
      case "add": {
        icon = (<IonIcon name="ios-add" size={36} color={this.props.tint} style={{marginBottom:-2}} />);
        break;
      }
      case "more":
      case "more-horz": {
        icon = (<MaterialCommunityIcon name="dots-horizontal" size={36} color={this.props.tint} style={styles.icon} />);
        break;
      }
      case "more-vert": {
        icon = (<MaterialCommunityIcon name="dots-vertical" size={36} color={this.props.tint} style={styles.icon} />);
        break;
      }
      case "checkbox": {
        icon = (<IonIcon name="ios-checkbox-outline" size={25} color={this.props.tint} style={[styles.icon, {marginTop:-1}]} />);
        break;
      }
      case "contact": {
        icon = (<IonIcon name="ios-contact" size={25} color={this.props.tint} style={[styles.icon, {marginTop:-1}]} />);
        break;
      }
      case "close": {
        icon = (<EvilIcon name="close" size={30} color={this.props.tint} style={{marginTop:-0}} />);
        break;
      }
      case "heart": {
        icon = (<IonIcon name="ios-heart" size={30} color={this.props.tint} style={{marginTop:-0}} />);
        break;
      }
      case "heart-outline": {
        icon = (<IonIcon name="ios-heart-outline" size={30} color={this.props.tint} style={{marginTop:-0}} />);
        break;
      }
      case "history": {
        icon = (<MaterialIcon name="history" size={30} color={this.props.tint} style={{marginTop:-0}} />);
        break;
      }
      default: {
        icon = (<SimpleLineIcon name={this.props.name} size={20} color={this.props.tint} style={styles.icon} />);
        break;
      }
    }

    return (
      <TouchableOpacity style={[styles.touchable, this.props.style]} underlayColor="#3C5EAE" onPress={this.props.onPress}>
        <View style={styles.container}>
            {icon}
        </View>
      </TouchableOpacity>
    )
  }
}

ToolbarButton.propTypes = {
  name: React.PropTypes.string,
  size: React.PropTypes.number,
  tint: React.PropTypes.string,
  onPress: React.PropTypes.func
}

ToolbarButton.defaultProps = {
  name: "user",
  tint: Color.tint,
  onPress: null
}

var styles = StyleSheet.create({
  touchable: {

  },
  container: {
    padding: 0,
    paddingHorizontal: 8,
    paddingVertical: 2
  },
  icon: {
    padding: 0
  }
})
