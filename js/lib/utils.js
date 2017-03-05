import { Error } from "../models"

export function msgFromError(e) {
  let msg = "";
  if (e) {
    if (Error.isError(e)) {
      msg = e.error;
    }
    else if (typeof e === "object" && e.message) {
      msg = e.message;
    }
    else if (typeof e === "function") {
      msg = msgFromError(e());
    }
    else if (typeof e === "string") {
      msg = e;
    }
    else {
      msg = JSON.stringify(e);
    }
  }
  return msg;
}