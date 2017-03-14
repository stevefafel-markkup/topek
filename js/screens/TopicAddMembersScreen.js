import React, { Component } from "react"
import { StyleSheet, View, Text, Button, StatusBar, TouchableHighlight } from "react-native"
import { ToolbarTextButton, ErrorHeader, FieldButton } from "../components"
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
export default class TopicAddMembersScreen extends Component {

  static navigationOptions = {
    title: "Choose Members",
    header: (navigation, defaultHeader) => ({
      ...defaultHeader,
      right: <ToolbarTextButton title="Next" active={true} onPress={() => navigation.navigate("TopicAddConfirm")} />,
      backTitle: " "
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
          ref="form">
        
          <FieldGroup>
            
          </FieldGroup>

        </Form>

      </View>
    )
  }

  async _saveType() {
    const { navigate } = this.props.navigation;
    //if (await this.props.saveClick(this.state.title))
    //  this.props.navigation.goBack(null);
    navigate("TopicAddTypeDetails")
  }
}

let styles = StyleSheet.create({
})
