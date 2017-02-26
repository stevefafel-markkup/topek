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
      return {
        error: Utils.msgFromError(e)
      }
    }
  }

}

export default new TopicsService()
