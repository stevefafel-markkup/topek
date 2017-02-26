import * as Types from "../types"
import Validate from "../../lib/validate"
import * as Utils from "../../lib/utils"
import topicService from "../../services/topicService"

export function load(username, password) {
  return async dispatch => {

    dispatch({type: Types.TOPIC_REQUEST});
    
    try {
      var results = await topicService.load();
      if (results.error) throw results.error;

      dispatch({type: Types.TOPIC_SUCCESS, payload: results});
    }
    catch (e) {
      dispatch({type: Types.TOPIC_FAILURE, payload: {
        error: Utils.msgFromError(e)
      }});
    }
  }
}
