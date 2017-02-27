class MockQuery {

  constructor(cls) {
    this.cls = cls;
  }

  include(col) {
    return this;
  }

  descending(col) {
    return this;
  }

  find() {
    return this;
  }
}

class MockObject {

  constructor() {
    this.__cols = {}
  }

  set(col, val) {
    this.__cols[col] = val;
    return this;
  }

  save() {
    if (api.__saveError)
      throw api.__saveError;
    return this;
  }
}

const api = {
  User: {
    current: () => {
      return this.default.User.__validUser;
    },
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
      return {
        username: user.username
      }
    }, 
    __validUser: {
      username: "user@email.com",
      password: "123456",
      error: null
    },
    __invalidUsernameError: "Invalid user",
    __invalidPasswordError: "Invalid password",
  },

  Query: (cls) => {
    if (this.default.__queryError)
      throw this.default.__queryError;
    return new MockQuery(cls);
  },

  __queryError: null,

  Object: {
    extend: (cls) => {
      return MockObject;
    }
  },

  __saveError: null
}

export default api;