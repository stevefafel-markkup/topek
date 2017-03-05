import Immutable from "immutable"

const UserRecord = Immutable.Record({
  id: null,
  createdAt: null,
  updatedAt: null,
  email: "",
  username: "",
  name: "",
  alias: "",
  avatar: new Immutable.Record({
    name: "",
    url: "",
    valid: false
  })()
})

export default class User extends UserRecord {
  static fromParse(user) {
    let res = new User()
      .set("id", user.id)
      .set("createdAt", user.createdAt)
      .set("updatedAt", user.updatedAt)
      .set("email", user.get("email"))
      .set("username", user.get("username"))
      .set("name", user.get("name"))
      .set("alias", user.get("alias"));
    if (user.get("avatar")) {
      res = res
        .setIn(["avatar", "name"], user.get("avatar").name())
        .setIn(["avatar", "url"], user.get("avatar").url())
        .setIn(["avatar", "valid"], true)
    }
    return res;
  }
}