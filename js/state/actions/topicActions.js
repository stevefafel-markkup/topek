import * as Types from "../types"
import Validate from "../../lib/validate"
import * as Utils from "../../lib/utils"
import topicService from "../../services/topicService"

export function load(skipRequest = true) {
  return async (dispatch, getState) => {
    if (!skipRequest) 
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
    dispatch({type: Types.TOPICS_UPDATE_REQUEST});
    
    try {
      Validate.notEmpty(title, "Title is required");

      var results = await topicService.add(title);
      if (results.error) throw results.error;

      dispatch({type: Types.TOPICS_ADD_SUCCESS, payload: results});
      return true;
    }
    catch (e) {
      dispatch({type: Types.TOPICS_UPDATE_FAILURE, payload: {
        error: Utils.msgFromError(e)
      }});
    }
    return false;
  }
}

export function destroy(id) {
  return async (dispatch, getState) => {
    dispatch({type: Types.TOPICS_UPDATE_REQUEST});
    
    try {
      var results = await topicService.destroy(id);
      if (results.error) throw results.error;

      dispatch({type: Types.TOPICS_REMOVE_SUCCESS, payload: results});
      return true;
    }
    catch (e) {
      dispatch({type: Types.TOPICS_UPDATE_FAILURE, payload: {
        error: Utils.msgFromError(e)
      }});
    }
    return false;
  }
}

export function setSelected(topic) {
  return {type: Types.TOPICS_SELECT_TOPIC, payload: topic}
}
