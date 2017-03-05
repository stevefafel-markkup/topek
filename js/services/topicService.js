import Parse from "parse/react-native"
import { InteractionManager } from "react-native"
import { TopicMap, Topic, Error } from "../models"
import * as Utils from "../lib/utils"

class TopicService {

  async load(orgId) {

    await InteractionManager.runAfterInteractions();
    
    try {

      const ParseOrg = Parse.Object.extend("Org");
      let org = new ParseOrg();
      org.id = orgId;

      let query = new Parse.Query("Topic")
        .include("owner")
        .include("members")
        .descending("updatedAt")
        .equalTo("org", org);

      const data = await query.find();
      return TopicMap.fromParse(data);
    }
    catch (e) {
      throw Error.fromException(e)
    }
  }

  async add(orgId, title) {

    await InteractionManager.runAfterInteractions();

    try {

      const ParseTopic = Parse.Object.extend("Topic");
      const ParseOrg = Parse.Object.extend("Org");
      const me = Parse.User.current();

      let org = new ParseOrg();
      org.id = orgId;

      let topic = new ParseTopic();
      topic.set("name", title);
      topic.set("owner", me);
      topic.set("org", org);
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
      return Topic.fromParse(result);
    }
    catch (e) {
      throw Error.fromException(e)
    }
  }

  async destroy(id) {

    await InteractionManager.runAfterInteractions();

    try {

      const ParseTopic = Parse.Object.extend("Topic");

      let topic = new ParseTopic();
      topic.set("id", id);

      const result = await topic.destroy();
      return id;
    }
    catch (e) {
      throw Error.fromException(e)
    }

  }

}

export default new TopicService()
