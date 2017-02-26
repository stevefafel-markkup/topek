import React, { Component } from "react"
import { StyleSheet, View, Text, Image, Animated } from "react-native"
import CachedImage from "react-native-cached-image"
import { connectprops, PropMap } from "react-redux-propmap"
import { ToolbarButton } from "../components"
import Layout from "../lib/Layout"
import { Field, FieldGroup, TouchableField, InputField } from "react-native-fields"
import Styles, { Color, Dims } from "../styles"

let AnimatedCachedImage = Animated.createAnimatedComponent(CachedImage)

class Props extends PropMap {
  map(props) {
    props.user = this.state.profile.user;
    props.isAuthenticated = this.state.auth.isAuthenticated;
  }
}

@connectprops(Props)
export default class MeScreen extends Component {

  static navigationOptions = {
    title: "Me",
    header: ({ state, setParams, navigate }) => ({
      right: <ToolbarButton name="settings" color={Color.tintNavbar} onPress={() => navigate("Settings")} />,
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
            </View>
          </Animated.ScrollView>
        </View>
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

    let opacity = scrollY.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [1, 1, 0],
    });

    let bottomTranslateY = scrollY.interpolate({
      inputRange: [-150, 0, 150],
      outputRange: [120, 0, -120],
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
          <AnimatedCachedImage
            source={avatarSource}
            xdefaultSource={require("../assets/images/circle-user-man-512.png")}
            style={[styles.avatar, {opacity: opacity, transform: [{scale: imgScale}, {translateY: imgTranslateY}]}]}
            resizeMode="contain"
          />
          <Animated.View style={[styles.headerBottomContainer, {transform: [{translateY: bottomTranslateY}], opacity: opacity}]}>
            <Text style={styles.headerLine1}>{this.props.user.name}</Text>
            <Text style={styles.headerLine2}>{"@" + this.props.user.alias}</Text>
          </Animated.View>
        </View>
      </View>
    );
  }
}

const HeaderHeight = 200;

let styles = StyleSheet.create({
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
    marginTop: -150,
    backgroundColor: "rgba(255, 255, 255, 0.1)"
  }
})
