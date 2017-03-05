import Immutable from "immutable"
import * as Utils from "../lib/utils"

const ErrorRecord = Immutable.Record({
  error: "",
  type: "ErrorRecord"
})

export default class Error extends ErrorRecord {
  static fromException(e) {
    return new Error()
      .set("error", Utils.msgFromError(e))
  }
  static throwIfError(e) {
    if (e && e.type && e.type === "ErrorRecord")
      throw e;
  }
  static isError(e) {
    return (e && e.type && e.type === "ErrorRecord");
  }
}