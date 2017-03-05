import Immutable from "immutable"
import Org from "./Org"

export default class OrgMap extends Immutable.OrderedMap {
  static fromParse(orgs) {
    return Immutable.OrderedMap(orgs.map(t => [t.id, Org.fromParse(t)]));
  }
}