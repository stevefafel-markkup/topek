class MockQuery {

  constructor(cls, result) {
    this.cls = cls;
    this.result = result;
  }

  include(col) {
    return this;
  }

  descending(col) {
    return this;
  }

  equalTo(col, val) {
    return this;
  }

  find() {
    let result = [];
    return this.result.map(i => {
      return new MockObject(i);
    })
  }
}

class MockObject {

  constructor(cols) {
    this.__cols = cols || {}
  }

  get id() {
    return this.get("id");
  }

  set id(val) {
    this.set("id", val);
  }

  set(col, val) {
    this.__cols[col] = val;
    return this;
  }

  get(col) {
    return this.__cols[col];
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
      return new MockObject({
        id: "kjhghg",
        createAt: new Date(),
        updatedAt: new Date(),
        username: "user@email.com"
      });
    },
    logIn: (username, password) => {
      let user = new MockObject(this.default.__loginResult);
      if (user.get("username") != username)
        throw {
          message: this.default.__loginUsernameError
        } 
      if (this.default.__loginValidPassword != password)
        throw {
          message: this.default.__loginPasswordError
        } 
      if (user.error)
        throw {
          message: this.default.__loginError
        } 
      return user
    }
  },

  Query: (cls) => {
    if (this.default.__queryError)
      throw this.default.__queryError;
    return new MockQuery(cls, this.default.__queryFindResult);
  },

  __loginResult: {},
  __loginValidPassword: "",
  __loginUsernameError: null,
  __loginPasswordError: null,
  __loginError: null,
  __queryFindResult: [],
  __queryError: null,
  __saveError: null,

  Object: {
    extend: (cls) => {
      return MockObject;
    }
  }
}

export default api;