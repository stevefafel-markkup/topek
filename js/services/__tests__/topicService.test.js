jest.mock("parse/react-native")

import topicService from "../topicService"
import mockParse from "parse/react-native"

describe("topicService", () => {

  describe("load method", () => {

    it("should load", async () => {
      const res = await topicService.load();
      expect(res.cls).toEqual("Topic")
    })

    it("should fail load", async () => {
      mockParse.__queryError = "err";
      const res = await topicService.load();
      expect(res.error).toEqual(mockParse.__queryError)
    })

  })

  describe("add method", () => {

    it("should add", async () => {
      const title = "title";
      const res = await topicService.add(title);
      expect(res.__cols["name"]).toEqual(title)
      expect(res.__cols["owner"]).toEqual(mockParse.User.current())
    })

    it("should fail add", async () => {
      const title = "title";
      mockParse.__saveError = "err";
      const res = await topicService.add(title);
      expect(res.error).toEqual(mockParse.__saveError)
    })

  })

})