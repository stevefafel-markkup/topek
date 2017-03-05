// mock authService
jest.mock("../../../services/authService", () => ({}))
const authService = require("../../../services/authService");
authService.login = () => {
  return "ok";
}
authService.registerDevice = (token) => {
  if (token == "token")
    return "ok";
  throw token;
}

// mock pushService
jest.mock("../../../services/pushService", () => ({}))
const pushService = require("../../../services/pushService");
pushService.requestPermissions = () => {
}

// mock store
import configureStore from "redux-mock-store"
import thunk from "redux-thunk"
const mockStore = configureStore([thunk])


import * as Types from "../../types"
import * as actions from "../authActions"

describe("authActions", () => {

  it("should set logoutState", () => {
    expect(actions.logout()).toEqual({type: Types.LOGOUT_SUCCESS})
  })

  it("should login", () => {
    const expectedActions = [
      {type: Types.LOGIN_REQUEST},
      {type: Types.LOGIN_SUCCESS}
    ]
    const store = mockStore({})

    return store.dispatch(actions.login("test@here.com", "pwd"))
      .then(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type)
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type)
        expect(store.getActions()[1].payload).toEqual("ok")
      })
  })

  function execLoginWithFailure(username, password, error) {
    const expectedActions = [
      {type: Types.LOGIN_REQUEST},
      {type: Types.LOGIN_FAILURE}
    ]
    const store = mockStore({})

    return store.dispatch(actions.login(username, password))
      .then(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type)
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type)
        expect(store.getActions()[1].payload.error).toEqual(error)
      })
  }

  it("should login fail with missing username", () => {
    execLoginWithFailure("", "", "Email is required")
  })

  it("should login fail with invalid username email", () => {
    execLoginWithFailure("ssdfsdf", "password", "Email is not valid")
  })

  it("should login fail with missing password", () => {
    execLoginWithFailure("ssdfsdf", "", "Password is required")
  })

  it("should login fail with wrong username", () => {
    execLoginWithFailure("user@here.com", "dddd", "Incorrect username or password")
  })

  it("should registerDevice", () => {
    const expectedActions = [
      {type: Types.REGISTER_REQUEST},
      {type: Types.REGISTER_SUCCESS}
    ]
    const store = mockStore({})

    return store.dispatch(actions.registerDevice("token"))
      .then(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type)
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type)
        expect(store.getActions()[1].payload).toEqual("ok")
      })
  })

  it("should registerDevice fail", () => {
    const expectedActions = [
      {type: Types.REGISTER_REQUEST},
      {type: Types.REGISTER_FAILURE}
    ]
    const store = mockStore({})

    return store.dispatch(actions.registerDevice("fail"))
      .then(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type)
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type)
        expect(store.getActions()[1].payload.error).toEqual("fail")
      })
  })

  it("should set requestPushPermissionsState", () => {
    const expectedActions = [
      {type: Types.PUSH_SUCCESS}
    ]
    const store = mockStore({})

    return store.dispatch(actions.requestPushPermissions())
      .then(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type)
      })
  })

})

