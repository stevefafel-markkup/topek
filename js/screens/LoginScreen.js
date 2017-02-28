import React, { Component } from "react"
import { StyleSheet, View, Text, Button, Image, ActivityIndicator } from "react-native"
import { FieldButton } from "../components"
import { connectprops, PropMap } from "react-redux-propmap";
import * as authActions from "../state/actions/authActions"
import { Form, InputField, KeyboardAwareScrollView, FieldGroup } from "react-native-fields"
import Styles, { Color, Dims } from "../styles"

class Props extends PropMap {
  map(props) {
    props.isAuthenticated = this.state.auth.isAuthenticated;
    props.isAuthenticating = this.state.auth.isAuthenticating;
    props.error = this.state.auth.error;
    props.lastUsername = this.state.auth.lastUsername;
    props.loginClick = this.bindEvent(authActions.login);
  }
}

@connectprops(Props)
export default class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

  render() {
    return (<KeyboardAwareScrollView style={[Styles.screen, styles.screen]} keyboardShouldPersistTaps="always">
      <Form
        ref="loginForm"
        onChange={this._handleFormChange.bind(this)}>

        <View style={styles.logoContainer}>
          <Image 
            style={styles.logo}
            resizeMode="contain"
            source={require("../assets/images/app-icon.png")}
          />
        </View>

        <FieldGroup title="Enter Credentials" ref="group">
          <InputField
            ref="username"
            value={this.props.lastUsername}
            placeholder="Email"
            returnKeyType="next"
            keyboardType="email-address"
            autoCapitalize="none"
            spellCheck={false}
            autoCorrect={false}
            editable={!this.props.isAuthenticating}
            onSubmitEditing={() => this.refs.loginForm.refs.group.refs.password.focus()}
            />
          <InputField
            ref="password"
            placeholder="Password"
            secureTextEntry={true}
            returnKeyType="go"
            editable={!this.props.isAuthenticating}
            onSubmitEditing={() => this._handleFormSubmit()} 
            />
        </FieldGroup>

      </Form>

      {this.props.error != "" && 
        <View style={styles.errorContainer}>
          <Text style={styles.error}>{this.props.error}</Text>
        </View> }

      <View style={styles.buttonContainer}>

        


        {this.props.isAuthenticating ? <ActivityIndicator /> :
        <FieldButton 
          title="Sign In"
          color="#CC3C3B"
          onPress={() => this._handleFormSubmit()}
        />
        }
      </View>
    </KeyboardAwareScrollView>)
  }

  _handleFormChange(formData) {
    this.setState({username: formData.username, password: formData.password})
  }

  _handleFormSubmit() {
    this.props.loginClick(this.state.username, this.state.password)
  }
}

let styles = StyleSheet.create({
  screen: {
    backgroundColor: Color.tint
  },
  logoContainer: {
    flex: 1,
    height: 128,
    marginTop: 113,
    marginRight: 120,
    marginLeft: 120,
    marginBottom: 80,
    alignItems: "center"
  },
  logo: {
    height: 200
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  error: {
    color: "#FFFFFFCC"
  },
  buttonContainer: {
    marginTop: 0
  },
  button: {
    color: "#FFF"
  }
})
