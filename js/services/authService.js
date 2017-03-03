import Parse from "parse/react-native"
import { InteractionManager } from "react-native"
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

}

export default new AuthService()