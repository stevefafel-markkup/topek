import * as Types from "../../types"
import * as actions from "../authActions"
import configureStore from "redux-mock-store"
import thunk from "redux-thunk"

const mockStore = configureStore([thunk])
import mockParse from "parse/react-native"

describe("authActions", () => {

  it("should set logoutState", () => {
    expect(actions.logout()).toEqual({type: Types.LOGOUT_SUCCESS})
  })

  it("should login", () => {
    const validUsername = mockParse.User.__validUser.username
    const validPassword = mockParse.User.__validUser.password
    const expectedActions = [
      {type: Types.LOGIN_REQUEST},
      {type: Types.LOGIN_SUCCESS, payload: {username: validUsername}}
    ]
    const store = mockStore({})

    return store.dispatch(actions.login(validUsername, validPassword))
      .then(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type)
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type)
        expect(store.getActions()[1].payload.username).toEqual(validUsername)
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

})

