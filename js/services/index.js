import Parse from "parse/react-native"
import Config from "../config"

export default {
  initialize: () => {
  
    // initialize parse api
    console.log("Parse initialized: ", Config.serverKey, Config.serverURL)
    Parse.initialize(Config.serverKey);
    Parse.serverURL = `${Config.serverURL}/parse`;

  }
}