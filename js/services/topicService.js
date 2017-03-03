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
      topic.set("details", [
        {
          type: "event",
          order: 1,
          dateStart: new Date(2017, 3, 15, 3, 43, 0),
          title: "Event starting 3/15/2017"
        },
        {
          type: "info",
          order: 2,
          title: "Please bring necessary documentation"
        }
      ])

      const result = await topic.save();
      return result;
    }
    catch (e) {
      return {
        error: Utils.msgFromError(e)
      }
    }
  }

  async destroy(id) {

    await InteractionManager.runAfterInteractions();

    try {

      const Topic = Parse.Object.extend("Topic");

      let topic = new Topic();
      topic.set("id", id);

      const result = await topic.destroy();
      return id;
    }
    catch (e) {
      return {
        error: Utils.msgFromError(e)
      }
    }

  }

}

export default new TopicService()
