jest.mock("parse/react-native")

import topicService from "../topicService"
import mockParse from "parse/react-native"

describe("topicService", () => {

  const testResults = [{
    id: "123",
    name: "foo"
  }, {
    id: "456",
    name: "bar"
  }]

  const testOrgId = "123"
  const testTitle = "title"

  describe("load method", () => {

    it("should load", async () => {
      mockParse.__queryFindResult = testResults;
      const res = await topicService.load();
      expect(res.size).toEqual(2);
    })

    it("should fail load", async () => {
      mockParse.__queryError = "err";
      try {
        const res = await topicService.load();
      }
      catch (e) {
        expect(e.error).toEqual(mockParse.__queryError)
      }
    })

  })

  describe("add method", () => {

    it("should add", async () => {
      const res = await topicService.add(testOrgId, testTitle);
      expect(res.get("name")).toEqual(testTitle)
      expect(res.get("owner").id).toEqual(mockParse.User.current().id)
    })

    it("should fail add", async () => {
      mockParse.__saveError = "err";
      try {
        const res = await topicService.add(testOrgId, testTitle);
      }
      catch (e) {
        expect(e.error).toEqual(mockParse.__saveError)
      }
    })

  })

})