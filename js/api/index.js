import * as parseApi from "./parse"

export default {

  initialize: () => {
    return parseApi.initialize();
  },

  login: async (username, password) => {
    return parseApi.login(username, password);
  }
  
}