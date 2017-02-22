import Parse from "parse/react-native"
import * as Utils from "../lib/utils"

export default {
  login: async (username, password) => {
    // mock this for now
    //var json = await Parse.User.logIn(username, password)

    await Utils.sleep(500);
    if (username == "dave@markkup.com") {
      return {
        username: username
      }
    }
    else {
      return {
        error: "Incorrect username or password"
      }
    }
  }
}
