import React, { Component, Text } from "react"
import { Provider } from "react-redux"
import Parse from "parse/react-native"
import App from "./app"
import Config from "./config"
import State from "./state"

export default function bootstrap() {

  // initialize dependencies
  initializeParse();

  // this root components hooks up the state.
  class Root extends Component {
    constructor() {
      super();
      this.state = {
        store: State.configureStore()
      };
    }

    componentWillMount(){
      State.persistStore(this.state.store)
    }

    render() {
      return (
        <Provider store={this.state.store}>
          <App />
        </Provider>
      );
    }
  }

  return Root
}

function initializeParse() {
  console.log("Parse: ", Config.serverKey, Config.serverURL)
  Parse.initialize(Config.serverKey);
  Parse.serverURL = `${Config.serverURL}/parse`;
}
