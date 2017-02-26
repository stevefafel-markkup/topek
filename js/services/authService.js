import Parse from "parse/react-native"
import * as Utils from "../lib/utils"

export default {
  login: async (username, password) => {
    try {
      var user = await Parse.User.logIn(username, password);
      return user;
    }
    catch (e) {
      return {
        error: Utils.msgFromError(e)
      }
    }
  }
}
