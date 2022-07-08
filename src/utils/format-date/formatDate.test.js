import formatDate from "./index";

const testDate = 1617036744278; // 29-03-2021

it("utils:formatDate with timestamp", () => {
  expect(formatDate(testDate)).toEqual("29-03-2021");
});

it("utils:formatDate with ISO Date", () => {
  const date = new Date(testDate);
  expect(formatDate(date.toISOString())).toEqual("29-03-2021");
});

it("utils:formatDate empty values", () => {
  expect(formatDate(undefined)).toEqual("");
  expect(formatDate(null)).toEqual("");
  expect(formatDate(0)).toEqual("");
  expect(formatDate("")).toEqual("");
});
