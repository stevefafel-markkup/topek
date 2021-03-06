import React, { Component, Text } from "react"
import { Provider } from "react-redux"
import Services from "./services"
import App from "./app"
import Config from "./config"
import State from "./state"
import SplashScreen from "./screens/SplashScreen"
import Styles from "./styles"

import * as appActions from "./state/actions/appActions"

export default function bootstrap() {

  // for now, don't restore nav state
  State.purgePersistedState(["nav"]);

  // setup styles
  Styles.setup();

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

        // initialize dependencies
        Services.initialize(this.state.store.dispatch);

        // load our initial state
        this.state.store.dispatch(appActions.initialize())
        
        // setup live queries
        Services.setupLiveQueries(this.state.store.dispatch);
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
