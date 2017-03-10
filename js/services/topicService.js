import Parse from "parse/react-native"
import { InteractionManager } from "react-native"
import { TopicMap, Topic, UserMap, Error } from "../models"
import * as Utils from "../lib/utils"

const ParseOrg = Parse.Object.extend("Org");
const ParseTopic = Parse.Object.extend("Topic");
const ParseUser = Parse.Object.extend("User");

class TopicService {

  async load(orgId) {

    await InteractionManager.runAfterInteractions();
    
    try {

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

  async loadMembers(topicId) {

    await InteractionManager.runAfterInteractions();
    
    try {

      // this query syntax was pulled together from the Parse SDK
      let query = new Parse.Query("User");
      query._addCondition("$relatedTo", "object", {
        __type: "Pointer",
        className: "Topic",
        objectId: topicId
      });
      query._addCondition("$relatedTo", "key", "members");

      const result = await query.find();
      return UserMap.fromParse(result);
    }
    catch (e) {
      throw Error.fromException(e)
    }
  }

  async add(orgId, title) {

    await InteractionManager.runAfterInteractions();

    try {

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

      let topic = new ParseTopic();
      topic.set("id", id);

      const result = await topic.destroy();
      return id;
    }
    catch (e) {
      throw Error.fromException(e)
    }

  }

  async addMembers(topicId, membersMap) {

    await InteractionManager.runAfterInteractions();

    try {

      let topic = new ParseTopic();
      topic.set("id", topicId);

      let relation = topic.relation("members");
      membersMap.map(member => {
        let user = new ParseUser();
        user.id = member.id;
        relation.add(user);
      });
      
      const result = await topic.save();
      return this.loadMembers(topicId);
    }
    catch (e) {
      throw Error.fromException(e)
    }

  }

  async removeMember(topicId, member) {

    await InteractionManager.runAfterInteractions();

    try {

      let topic = new ParseTopic();
      topic.set("id", topicId);

      let relation = topic.relation("members");
      let user = new ParseUser();
      user.id = member.id;
      relation.remove(user);
      
      const result = await topic.save();
      return this.loadMembers(topicId);
    }
    catch (e) {
      throw Error.fromException(e)
    }

  }

}

export default new TopicService()
