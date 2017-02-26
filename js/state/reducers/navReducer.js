import Nav from "../../navigation"

export default function reduce(state, action) {
    return Nav.router.getStateForAction(action, state)
}