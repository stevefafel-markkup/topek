import React, { Component } from "react"
import { StyleSheet, View, Text, Image, Animated } from "react-native"
import { NavbarButton, ToolbarButton, AvatarImage } from "../components"
import { connectprops, PropMap } from "react-redux-propmap"
import Layout from "../lib/Layout"
import * as authActions from "../state/actions/authActions"
import { Field, FieldGroup, TouchableField, InputField } from "../react-native-fieldsX"
import Styles, { Color, Dims } from "../styles"

class Props extends PropMap {
  map(props) {
    props.user = this.state.profile.user;
    props.logoutClick = this.bindEvent(authActions.logout);
  }
}

@connectprops(Props)
export default class MeScreen extends Component {

  static navigationOptions = {
    title: "",
    header: (navigation, defaultHeader) => ({
      ...defaultHeader,
      visible: false
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0)
    };
  }

  render() {
    let { scrollY } = this.state;

    const {navigate} = this.props.navigation;

    return (
      <View style={Styles.screen}>
        <View style={styles.animatedContainer}>
          {this._renderHeader()}
          <Animated.ScrollView
            scrollEventThrottle={16}
            style={StyleSheet.absoluteFill}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}>
            <View style={styles.headerSpacer} />
            <View style={styles.contentContainerStyle}>
              <FieldGroup>
                <InputField label="Email" value={this.props.user.email} editable={false} />
              </FieldGroup>
              <FieldGroup>
                <TouchableField text="Settings" onPress={() => navigate("SettingsStack")} />
                <TouchableField text="Log Out" onPress={this.props.logoutClick} />
              </FieldGroup>
            </View>
          </Animated.ScrollView>
        </View>
        {this._renderNavbar()}
      </View>
    )
  }

  _renderNavbar() {
    let { scrollY } = this.state;

    let titleOpacity = scrollY.interpolate({
      inputRange: [-200, 0, 100],
      outputRange: [0, 0, 1],
    });

    const {navigate} = this.props.navigation;

    return (
      <View style={styles.navbar}>
        <View style={styles.navbarTextContainer}>
          <Animated.Text style={[styles.navbarText, {opacity: titleOpacity}]}>{this.props.user.name}</Animated.Text>
        </View>
        <ToolbarButton 
          name="more" 
          color={Color.tintNavbar} 
          style={styles.navbarButton}
          onPress={() => navigate("ProfileEditStack")} /> 
      </View>
    )
  }

  _renderHeader() {
    let { scrollY } = this.state;

    let imgScale = scrollY.interpolate({
      inputRange: [-150, 0, 150],
      outputRange: [1.5, 1, 1],
    });

    let imgTranslateY = scrollY.interpolate({
      inputRange: [-150, 0, 150],
      outputRange: [40, 0, -40],
    });

    let imgOpacity = scrollY.interpolate({
      inputRange: [-200, 0, 100],
      outputRange: [1, 1, 0],
    });

    let infoOpacity = scrollY.interpolate({
      inputRange: [-200, 0, 150],
      outputRange: [1, 1, 0],
    });

    let bottomTranslateY = scrollY.interpolate({
      inputRange: [-150, 0, 150],
      outputRange: [120, 0, -220],
    });

    let headerBackgroundTranslateY = scrollY.interpolate({
      inputRange: [-1, 0],
      outputRange: [1, 0],
    });

    let avatarSource = require("../assets/images/circle-user-man-512.png")
    if (this.props.user.avatar.valid) {
      avatarSource = {
        uri: this.props.user.avatar.url
      }
    }

    return (
      <View>
        <Animated.View 
          style={[styles.headerBackground, { transform: [{translateY: headerBackgroundTranslateY}] }]}
         />
        <View style={styles.header}>
          <Animated.View
            style={{marginTop: -100, opacity: imgOpacity, transform: [{scale: imgScale}, {translateY: imgTranslateY}]}}>
            <AvatarImage
              source={avatarSource}
              size={100}
            />
          </Animated.View>
          <Animated.View style={[styles.headerBottomContainer, {transform: [{translateY: bottomTranslateY}], opacity: infoOpacity}]}>
            <Text style={styles.headerLine1}>{this.props.user.name}</Text>
            <Text style={styles.headerLine2}>{"@" + this.props.user.alias}</Text>
          </Animated.View>
        </View>
      </View>
    );
  }
}

const HeaderHeight = 240;

let styles = StyleSheet.create({
  navbar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: Color.tint
  },
  navbarButton: {
    position: "absolute",
    right: 0,
    top: 22,
    width: 50,
    zIndex: 1000
  },
  navbarTextContainer: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0
  },
  navbarText: {
    flex: 1,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
    color: Color.tintNavbar,
    paddingTop: 12
  },
  animatedContainer: {
    flex: 1,
    flexDirection: "column", 
    backgroundColor: Color.backgroundFields
  },
  headerBackground: {
    backgroundColor: Color.tint,
    height: HeaderHeight + 300, 
    marginTop: -300
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: HeaderHeight + 200,
    marginTop: -30,
    alignItems: "center",
    justifyContent: "center"
  },
  headerSpacer: {
    width: Layout.window.width,
    height: HeaderHeight,
    backgroundColor: "transparent",
  },
  headerBottomContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    paddingTop: 10
  },
  headerLine1: {
    fontSize: 18,
    fontWeight: "600",
    color: "white"
  },
  headerLine2: {
    fontSize: 16, 
    color: "white"
  },
  contentContainerStyle: {
    paddingBottom: 20
  },
  avatar: {
    width: 100, 
    height: 100, 
    resizeMode: "contain", 
    borderRadius: 50,
    marginTop: -100,
    backgroundColor: "rgba(255, 255, 255, 0.0)"
  }
})
