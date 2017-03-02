import Nav from "../../navigation"
import * as Types from "../types"

export default function reduce(state, action) {

  switch (action.type) {

    /*case Types.TOPICS_SELECT_TOPIC: {
      return Nav.router.getStateForAction({
        type: "Navigation/NAVIGATE",
        routeName: "TopicDetails"
      }, state)
    }*/

    default:
      return Nav.router.getStateForAction(action, state)
  }
  
}