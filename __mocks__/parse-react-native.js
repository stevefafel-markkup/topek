export default {
  User: {
    logIn: (username, password) => {
      let user = this.default.User.__validUser;
      if (user.username != username)
        throw {
          message: this.default.User.__invalidUsernameError
        } 
      if (user.password != password)
        throw {
          message: this.default.User.__invalidPasswordError
        } 
      if (user.error)
        throw {
          message: user.error
        } 
      return {}
    }, 
    __validUser: {
      username: "user@email.com",
      password: "123456",
      error: null
    },
    __invalidUsernameError: "Invalid user",
    __invalidPasswordError: "Invalid password",
  }
}
