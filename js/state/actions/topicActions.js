import * as Types from "../types"
import Validate from "../../lib/validate"
import * as Utils from "../../lib/utils"
import topicService from "../../services/topicService"

export function load() {
  return async (dispatch, getState) => {
    dispatch({type: Types.TOPICS_REQUEST});
    
    try {
      var results = await topicService.load();
      if (results.error) throw results.error;

      dispatch({type: Types.TOPICS_SUCCESS, payload: results});
    }
    catch (e) {
      dispatch({type: Types.TOPICS_FAILURE, payload: {
        error: Utils.msgFromError(e)
      }});
    }
  }
}

export function add(title) {
  return async (dispatch, getState) => {
    dispatch({type: Types.TOPIC_ADD_REQUEST});
    
    try {
      Validate.notEmpty(title, "Title is required");

      var results = await topicService.add(title);
      if (results.error) throw results.error;

      dispatch({type: Types.TOPIC_ADD_SUCCESS, payload: results});
      return true;
    }
    catch (e) {
      dispatch({type: Types.TOPIC_ADD_FAILURE, payload: {
        error: Utils.msgFromError(e)
      }});
    }
    return false;
  }
}
