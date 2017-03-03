import Parse from "parse/react-native"
import Log from "./logService"
import PushService from "./pushService"
import Config from "../config"

import * as Types from "../state/types"

export default {

  initialize: (dispatch) => {
  
    // initialize parse api
    console.log("Parse initialized: ", Config.serverKey, Config.serverURL)
    Parse.initialize(Config.serverKey);
    Parse.serverURL = `${Config.serverURL}/parse`;

    // initialize logging
    console.log("Logging initialized: ", Config.loggingLogKey, Config.loggingApiKey)
    Log.initialize(Config.loggingLogKey, Config.loggingApiKey);

    // initialize push
    console.log("Push initialized")
    PushService.initialize(dispatch);
  },

  setupLiveQueries: (dispatch) => {

    let query = new Parse.Query("Topic").include("owner").include("members").descending("updatedAt");
    let subscription = query.subscribe();
    
    subscription.on("create", (topic) => {
      console.log("LiveQuery(Topic) dispatch TOPICS_ADD_SUCCESS: ", topic);
      dispatch({type: Types.TOPICS_ADD_SUCCESS, payload: topic});
    });

    subscription.on("update", (topic) => {
      console.log("LiveQuery(Topic) dispatch TOPICS_UPDATE_SUCCESS: ", topic);
      dispatch({type: Types.TOPICS_UPDATE_SUCCESS, payload: topic});
    });

    subscription.on("delete", (topic) => {
      console.log("LiveQuery(Topic) dispatch TOPICS_REMOVE_SUCCESS: ", topic);
      dispatch({type: Types.TOPICS_REMOVE_SUCCESS, payload: topic.id});
    });
  }
}