import React, { Component, Text } from "react"
import { Provider } from "react-redux"
import Api from "./api"
import App from "./app"
import Config from "./config"
import State from "./state"
import SplashScreen from "./screens/SplashScreen"

export default function bootstrap() {

  // initialize dependencies
  Api.initialize();

  // this root components hooks up the state.
  // it also delays rendering the app until state is rehydrated
  class Root extends Component {
    constructor() {
      super();
      this.state = {
        store: State.configureStore(),
        rehydrated: false
      };
    }

    componentWillMount(){
      State.persistStore(this.state.store, () => {
        this.setState({rehydrated: true})
      })
    }

    // render splash screen if we haven't been rehydrated
    render() {
      if(!this.state.rehydrated){
        return (<SplashScreen />);
      }
      return (
        <Provider store={this.state.store}>
          <App />
        </Provider>
      );
    }
  }

  return Root
}
