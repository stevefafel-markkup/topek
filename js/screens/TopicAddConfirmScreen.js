import React, { Component } from "react"
import { StyleSheet, View, Text, Button, StatusBar, TouchableHighlight } from "react-native"
import { ToolbarTextButton, ErrorHeader, FieldButton } from "../components"
import { Form, InputField, Field, FieldGroup, TouchableField } from "../react-native-fieldsX"
import { connectprops, PropMap } from "react-redux-propmap"
import * as topicActions from "../state/actions/topicActions"
import * as navActions from "../state/actions/navActions"
import Styles, { Color, Dims } from "../styles"

class Props extends PropMap {
  map(props) {
    props.isUpdating = this.state.topics.isUpdating;
    props.updateError = this.state.topics.updateError;
    props.dismissModal = this.bindEvent(navActions.dismissModal);
    props.saveClick = this.bindEvent(topicActions.add);
  }
}

@connectprops(Props)
export default class TopicAddConfirmScreen extends Component {

  static navigationOptions = {
    title: "Confirm",
    header: ({ state }, defaultHeader) => ({
      ...defaultHeader,
      right: <ToolbarTextButton title="Save" active={true} onPress={() => state.params.rightClick()} />,
      backTitle: " "
    })
  }

  constructor(props){
    super(props);
    this.state = {
      title: ""
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({
      rightClick: () => this._save()
    });
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    return (
      <View style={Styles.screenFields}>

        <StatusBar barStyle="dark-content" />
        { this.props.updateError && <ErrorHeader text={this.props.updateError} /> }
        
        <Form
          ref="form">
        
          <FieldGroup>
            
          </FieldGroup>

        </Form>

      </View>
    )
  }

  async _save() {
    //if (await this.props.saveClick(this.state.title))
    //  this.props.navigation.goBack(null);
    this.props.dismissModal("TopicAddStack")
  }
}

let styles = StyleSheet.create({
})
