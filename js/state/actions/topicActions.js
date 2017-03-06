import * as Types from "../types"
import Validate from "../../lib/validate"
import { Error } from "../../models"
import topicService from "../../services/topicService"

export function load(skipRequest = true) {
  return async (dispatch, getState) => {
    if (!skipRequest) 
      dispatch({type: Types.TOPICS_LOAD_REQUEST});

    try {
      const state = getState();
      if (!state.prefs.org)
        throw "No current org set"

      var results = await topicService.load(state.prefs.org.id);
      dispatch({type: Types.TOPICS_LOAD_SUCCESS, payload: results});
    }
    catch (e) {
      dispatch({type: Types.TOPICS_LOAD_FAILURE, payload: Error.fromException(e)});
    }
  }
}

export function add(title) {
  return async (dispatch, getState) => {
    dispatch({type: Types.TOPICS_UPDATE_REQUEST});
    
    try {
      Validate.notEmpty(title, "Title is required");

      const state = getState();
      if (!state.prefs.org)
        throw "No current org set"

      var results = await topicService.add(state.prefs.org.id, title);
      dispatch({type: Types.TOPICS_ADD_SUCCESS, payload: results});
      return true;
    }
    catch (e) {
      dispatch({type: Types.TOPICS_UPDATE_FAILURE, payload: Error.fromException(e)});
    }
    return false;
  }
}

export function destroy(id) {
  return async (dispatch, getState) => {
    dispatch({type: Types.TOPICS_UPDATE_REQUEST});
    
    try {
      var results = await topicService.destroy(id);
      dispatch({type: Types.TOPICS_REMOVE_SUCCESS, payload: results});
      return true;
    }
    catch (e) {
      dispatch({type: Types.TOPICS_UPDATE_FAILURE, payload: Error.fromException(e)});
    }
    return false;
  }
}

export function setSelected(topic) {
  return {type: Types.TOPICS_SELECT_TOPIC, payload: topic}
}
