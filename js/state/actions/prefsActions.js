import * as Types from "../types"
import * as orgActions from "./orgActions"
import * as topicActions from "./topicActions"
import { Error } from "../../models"

export function setOrg(org) {
  return async (dispatch, getState) => {
    await dispatch({type: Types.PREFS_SET_ORG, payload: org});
    await dispatch(orgActions.loadMembers(org.id));
    await dispatch(topicActions.load(true));
  }
}