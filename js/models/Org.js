import Immutable from "immutable"
import User from "./User"
import UserMap from "./UserMap"

const OrgRecord = Immutable.Record({
  id: null,
  createdAt: null,
  updatedAt: null,
  name: "",
  owner: new User(),
  membersRef: null,
  image: new Immutable.Record({
    name: "",
    url: "",
    valid: false
  })(),
  icon: new Immutable.Record({
    name: "",
    url: "",
    valid: false
  })()
})

export default class Org extends OrgRecord {
  static fromParse(org) {
    let res = new Org()
      .set("id", org.id)
      .set("createdAt", org.createdAt)
      .set("updatedAt", org.updatedAt)
      .set("name", org.get("name"))
    if (org.get("owner")) {
      res = res.set("owner", User.fromParse(org.get("owner")))
    }
    if (org.get("members")) {
      res = res.set("membersRef", org.get("members"))
    }
    if (org.get("image")) {
      res = res
        .setIn(["image", "name"], org.get("image").name())
        .setIn(["image", "url"], org.get("image").url())
        .setIn(["image", "valid"], true)
    }
    if (org.get("icon")) {
      res = res
        .setIn(["icon", "name"], org.get("icon").name())
        .setIn(["icon", "url"], org.get("icon").url())
        .setIn(["icon", "valid"], true)
    }
    return res;
  }
}