jest.mock("parse/react-native")

import authService from "../authService"
import mockParse from "parse/react-native"

describe("authService", () => {

  describe("login method", () => {

    const testUser = {
      id: "123",
      name: "foo",
      username: "bar",
    }
    const validPassword = "abc";

    it("should login", async () => {
      mockParse.__loginResult = testUser;
      mockParse.__loginValidPassword = validPassword;
      const res = await authService.login(testUser.username, validPassword);
      expect(res.username).toEqual(testUser.username)
    })

    it("should fail login w bad username", async () => {
      try {
        mockParse.__loginResult = testUser;
        mockParse.__loginValidPassword = validPassword;
        mockParse.__loginUsernameError = "err";
        const res = await authService.login("bad", validPassword);
      }
      catch (e) {
        expect(e.error).toEqual(mockParse.__loginUsernameError)
      }
    })

    it("should fail login w bad password", async () => {
      try {
        mockParse.__loginResult = testUser;
        mockParse.__loginValidPassword = validPassword;
        mockParse.__loginPasswordError = "err";
        const res = await authService.login(testUser.username, "bad");
      }
      catch (e) {
        expect(e.error).toEqual(mockParse.__loginPasswordError)
      }
    })

    it("should fail login w error", async () => {
      try {
        mockParse.__loginResult = testUser;
        mockParse.__loginValidPassword = validPassword;
        mockParse.__loginError = "err";
        const res = await authService.login(testUser.username, validPassword);
      }
      catch (e) {
        expect(e.error).toEqual(mockParse.__loginError)
      }
    })

  })

})