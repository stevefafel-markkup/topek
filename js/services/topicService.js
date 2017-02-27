import Parse from "parse/react-native"
import { InteractionManager } from "react-native"
import * as Utils from "../lib/utils"

class TopicService {

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

  async add(title) {

    await InteractionManager.runAfterInteractions();

    try {

      const Topic = Parse.Object.extend("Topic");
      const me = Parse.User.current();

      let topic = new Topic();
      topic.set("name", title);
      topic.set("owner", me);

      const result = await topic.save();
      return result;
    }
    catch (e) {
      return {
        error: Utils.msgFromError(e)
      }
    }
  }

}

export default new TopicService()
