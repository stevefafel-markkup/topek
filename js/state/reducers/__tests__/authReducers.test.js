import * as Types from "../../types"
import { REHYDRATE } from "redux-persist/constants"
import reducer from "../authReducer"

describe("authReducer", () => {

  let initialState = null

  beforeEach(() => {
    const action = {
      type: "dummy"
    }
    initialState = reducer(undefined, action)
  })

  function callReducer(type, payload) {
    const action = {
      type: type,
      payload: payload
    }
    return reducer(initialState, action)
  }

  it("record is valid for REHYDRATE", () => {
    let next = callReducer(REHYDRATE, {
      auth: {
        error: ""
      }
    })

    expect(next.isAuthenticated).toBe(false)
    expect(next.lastUsername).toBe("")
    expect(next.isAuthenticating).toBe(false)
    expect(next.error).toBe(null)
  })

  it("record is valid for LOGIN_REQUEST", () => {
    let next = callReducer(Types.LOGIN_REQUEST)

    expect(next.isAuthenticating).toBe(true)
    expect(next.error).toBe(null)
  })

  it("record is valid for LOGIN_SUCCESS", () => {
    let next = callReducer(Types.LOGIN_SUCCESS, {
      username: "foo"
    })

    expect(next.isAuthenticated).toBe(true)
    expect(next.lastUsername).toBe("foo")
    expect(next.isAuthenticating).toBe(false)
    expect(next.error).toBe(null)
  })

  it("record is valid for LOGIN_FAILURE", () => {
    let next = callReducer(Types.LOGIN_FAILURE, {
      error: "foo"
    })

    expect(next.isAuthenticated).toBe(false)
    expect(next.isAuthenticating).toBe(false)
    expect(next.error).toBe("foo")
  })

  it("record is valid for LOGOUT_SUCCESS", () => {
    let next = callReducer(Types.LOGOUT_SUCCESS)

    expect(next.isAuthenticated).toBe(false)
    expect(next.error).toBe(null)
  })

})
