import authService from "../authService"

describe("authService", () => {

  it("should login", async () => {
    var validUsername = "dave@markkup.com"
    var res = await authService.login(validUsername, "password");
    expect(res.username).toEqual(validUsername)
  })

  it("should fail login", async () => {
    var invalidUsername = "user@markkup.com"
    var res = await authService.login(invalidUsername, "password");
    expect(res.error).toEqual("Incorrect username or password")
  })

});