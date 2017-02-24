import * as utils from "../utils"

describe("utils", () => {

  describe("msgFromError", () => {

    let err = "err"

    it("should accept string", () => {
      expect(utils.msgFromError(err)).toEqual(err)
    })

    var errObj = {
      message: err
    }

    it("should accept object with message", () => {
      expect(utils.msgFromError(errObj)).toEqual(err)
    })

    var errObjNoMsg = {
      other: err
    }

    it("should accept object with NO message", () => {
      expect(utils.msgFromError(errObjNoMsg)).toEqual(JSON.stringify(errObjNoMsg))
    })

    let errFunc = () => { return err }

    it("should accept function", () => {
      expect(utils.msgFromError(errFunc)).toEqual(err)
    })

  })

})
