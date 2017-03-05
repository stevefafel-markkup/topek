import Immutable from "immutable"
import User from "./User"
import UserMap from "./UserMap"

const OrgRecord = Immutable.Record({
  id: null,
  createdAt: null,
  updatedAt: null,
  name: "",
  owner: new User(),
  membersRef: null
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
    return res;
  }
}