jest.mock("parse/react-native")

import authService from "../authService"
import mockParse from "parse/react-native"

describe("authService", () => {

  describe("login method", () => {

    it("should login", async () => {
      const validUsername = mockParse.User.__validUser.username
      const validPassword = mockParse.User.__validUser.password
      const res = await authService.login(validUsername, validPassword);
      expect(res.username).toEqual(validUsername)
    })

    it("should fail login", async () => {
      const res = await authService.login("username", "password");
      expect(res.error).toEqual(mockParse.User.__invalidUsernameError)
    })

  })

})