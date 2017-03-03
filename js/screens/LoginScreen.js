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
        
        <View style={styles.logoContainer}>
          <Image 
            style={styles.logo}
            resizeMode="contain"
            source={require("../assets/images/app-icon.png")}
          />
        </View>

        <View style={styles.formContainer}>

          <Form
            ref="loginForm"
            onChange={this._handleFormChange.bind(this)}>

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
              onPress={() => this._handleFormSubmit()}
            />
            }
          </View>

        </View>
      
      </KeyboardAwareScrollView>)
  }

  _handleFormChange(data) {
    this.setState({username: data.username, password: data.password})
  }

  _handleFormSubmit() {
    this.props.loginClick(this.state.username, this.state.password)
  }
}

let styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column"
  },
  logoContainer: {
    flex: 1,
    backgroundColor: Color.tint,
    paddingTop: 70,
    paddingRight: 120,
    paddingLeft: 120,
    paddingBottom: 70,
    alignItems: "center"
  },
  logo: {
    height: 200
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20 
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  error: {
    color: "#FF0000CC"
  },
  buttonContainer: {
    marginTop: 0
  },
  button: {
    color: "#FFF"
  }
})
