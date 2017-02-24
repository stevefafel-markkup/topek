import Parse from "parse/react-native"
import { InteractionManager } from "react-native"
import * as Utils from "../lib/utils"

class TopicsService {

  async load() {

    await InteractionManager.runAfterInteractions();

    try {
      let query = new Parse.Query("Topic").include("owner").include("members").descending("updatedAt");
      const data = await query.find();
      return data;
    }
    catch (e) {
      let err = e;
      if (typeof e === "object" && e.message) {
        err = e.message;
      }
      return {
        error: err
      }
    }
  }

}

export default new TopicsService()
