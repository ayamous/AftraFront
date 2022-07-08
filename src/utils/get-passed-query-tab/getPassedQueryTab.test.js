import getPassedQueryTab from "./index";

const tabs = ["tab1", "tab2", "tab3"];

it("utils:getPassedQueryTab normal case", () => {
  expect(getPassedQueryTab("?tab=tab2", tabs)).toEqual("tab2");
  expect(
    getPassedQueryTab("?limit=25&offset=2&filterQuery=Matt&tab=tab2", tabs)
  ).toEqual("tab2");
});

it("utils:getPassedQueryTab empty values", () => {
  expect(
    getPassedQueryTab("?limit=25&offset=2&filterQuery=Matt", tabs)
  ).toEqual("tab1");
  expect(
    getPassedQueryTab("?limit=25&offset=2&filterQuery=Matt&tab=xxxxxx", tabs)
  ).toEqual("tab1");
  expect(
    getPassedQueryTab("?limit=25&offset=2&filterQuery=Matt&tab=null", tabs)
  ).toEqual("tab1");
  expect(getPassedQueryTab("", tabs)).toEqual("tab1");
});
