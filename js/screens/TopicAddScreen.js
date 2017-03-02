import React, { Component } from "react"
import { StyleSheet, View, Text, Button, StatusBar, TouchableHighlight } from "react-native"
import { NavbarButton, ErrorHeader, FieldButton } from "../components"
import { Form, InputField, Field, FieldGroup, TouchableField } from "../react-native-fieldsX"
import { connectprops, PropMap } from "react-redux-propmap"
import * as topicActions from "../state/actions/topicActions"
import Styles, { Color, Dims } from "../styles"

class Props extends PropMap {
  map(props) {
    props.isUpdating = this.state.topics.isUpdating;
    props.updateError = this.state.topics.updateError;
    props.saveClick = this.bindEvent(topicActions.add);
  }
}

@connectprops(Props)
export default class TopicAddScreen extends Component {

  static navigationOptions = {
    title: "Add a New Topic",
    header: (navigation, defaultHeader) => ({
      ...defaultHeader,
      right: <NavbarButton title="Cancel" color={Color.tint} onPress={() => navigation.goBack(null)} />
    })
  }

  constructor(props){
    super(props);
    this.state = {
      title: ""
    }
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    return (
      <View style={Styles.screenFields}>

        <StatusBar barStyle="dark-content" />
        { this.props.updateError && <ErrorHeader text={this.props.updateError} /> }
        
        <Form
          ref="form"
          onChange={this._handleFormChange.bind(this)}>
        
          <FieldGroup>

            <InputField 
              ref="title"
              multiline={true}
              height={85}
              placeholder="Title" 
              returnKeyType="done"
              onSubmitEditing={(event) => {}}
            />

            {/*<TouchableField text="Save" onPress={this._saveTopic.bind(this)} />*/}
            {/*<TouchableField text="Next" onPress={() => navigate("SecondScreen")} />*/}
          </FieldGroup>

          <FieldButton 
            title="Save Topic" 
            disabled={this.props.isUpdating}
            onPress={this._saveTopic.bind(this)} />

        </Form>

      </View>
    )
  }

  _handleFormChange(data) {
    this.setState({
      title: data.title
    })
  }

  async _saveTopic() {
    if (await this.props.saveClick(this.state.title))
      this.props.navigation.goBack(null);
  }
}

let styles = StyleSheet.create({
})
