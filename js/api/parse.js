import Parse from "parse/react-native"
import Config from "../config"
import * as Utils from "../lib/utils"

export function initialize() {
  console.log("Parse initialized: ", Config.serverKey, Config.serverURL)
  Parse.initialize(Config.serverKey);
  Parse.serverURL = `${Config.serverURL}/parse`;
  return true;
}

export async function login(username, password) {
  console.log("Parse login: ", username);
  // mock this for now
  //var json = await Parse.User.logIn(username, password)
  var json = {
    username: username
  };
  await Utils.sleep(500);
  return json;
}
