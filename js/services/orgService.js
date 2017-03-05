import Parse from "parse/react-native"
import { InteractionManager } from "react-native"
import { OrgMap, UserMap, Error } from "../models"
import * as Utils from "../lib/utils"

class OrgService {

  async load() {

    await InteractionManager.runAfterInteractions();
    
    // return orgs that the current user is either:
    // 1) a member, or
    // 2) the owner

    try {
      let me = await Parse.User.currentAsync();
      if (!me) 
        return null;

      let ownerQuery = new Parse.Query("Org")
        .equalTo("owner", me)

      let memberQuery = new Parse.Query("Org")
        .equalTo("members", me)

      var query = Parse.Query.or(ownerQuery, memberQuery)
        .include("owner")
        .include("members")
        .descending("name")

      const result = await query.find();
      return OrgMap.fromParse(result);
    }
    catch (e) {
      throw Error.fromException(e)
    }
  }

  async loadMembers(org) {

    await InteractionManager.runAfterInteractions();

    try {
      const result = await org.membersRef.query().find();
      return UserMap.fromParse(result);
    }
    catch (e) {
      throw Error.fromException(e)
    }
  }

}

export default new OrgService()
