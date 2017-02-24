import Immutable from "immutable"

const Topic = Immutable.Record({
  id: null,
  createdAt: null,
  updatedAt: null,
  name: "",
  owner: null
})

Topic.fromParse = (topic) => {
  return new Topic()
    .set("id", topic.id)
    .set("createdAt", topic.createdAt)
    .set("updatedAt", topic.updatedAt)
    .set("name", topic.get("name"));
}

export default Topic;