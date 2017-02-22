import Parse from "parse/react-native"
import * as Utils from "../lib/utils"

export default {
  login: async (username, password) => {
    try {
      var json = await Parse.User.logIn(username, password)
      return {
        ...json,
        username: username
      }
    }
    catch (e) {
      let err = e;
      if (typeof e === "object" && e.message) {
        err = e.message;
      }
      return {
        error: err
      }
    }
  }
}
