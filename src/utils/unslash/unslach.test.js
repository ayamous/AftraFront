import unSlash from "./index";

it("utils:unSlach normal case", () => {
  expect(unSlash("http://gateway.com/")).toEqual("http://gateway.com");
  expect(unSlash("http://gateway.com")).toEqual("http://gateway.com");
  expect(unSlash("http://GATEWAY.com")).toEqual("http://gateway.com");
  expect(unSlash("http://GATEWAY.com   ")).toEqual("http://gateway.com");
});

it("utils:unSlach empty values", () => {
  expect(unSlash("")).toEqual("");
  expect(unSlash(null)).toEqual("");
  expect(unSlash(undefined)).toEqual("");
  expect(unSlash(23213221)).toEqual("");
});
