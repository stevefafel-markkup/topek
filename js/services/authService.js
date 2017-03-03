import Parse from "parse/react-native"
import { InteractionManager } from "react-native"
import Config from "../config"
import * as Utils from "../lib/utils"

class AuthService {

  async login(username, password) {

    await InteractionManager.runAfterInteractions();

    try {
      // returns a user object
      let result = await Parse.User.logIn(username, password);
      return result;
    }
    catch (e) {
      return {
        error: Utils.msgFromError(e)
      }
    }
  }

  async signup(username, email, password, name, alias) {

    await InteractionManager.runAfterInteractions();

    try {
      let user = new Parse.User();
      user.set("username", username);
      user.set("password", password);
      user.set("email", email);
      user.set("name", name);
      user.set("alias", alias);

      // returns a user object
      let result = await user.signUp();
      return result;
    }
    catch (e) {
      return {
        error: Utils.msgFromError(e)
      }
    }
  }

  // this function registers a device/installation with the server
  // so it can be queried and have notifications sent to it
  async registerDevice(token, tokenType, channels) {

    if (channels === undefined)
      channels = ["global"];

    await InteractionManager.runAfterInteractions();

    try {
      const data = {
        "deviceType": tokenType,
        "deviceToken": token,
        "channels": channels,
        "appName": Config.name,
        "appVersion": Config.version,
        "user": Parse.User.current().id
      }

      let url = `${Config.serverURL}/parse/installations`;

      let response = await fetch(url, {
          method: "POST",
          headers: {
              "Accept": "application/json",
              "X-Parse-Application-Id": Config.serverKey,
              "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
      });

      // returns an installation object
      let result = await response.json();
      return result;
    }
    catch (e) {
      return {
        error: Utils.msgFromError(e)
      }
    }
  }

}

export default new AuthService()