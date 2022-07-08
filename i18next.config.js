module.exports = {
  locales: ["en", "fr"],
  output: "src/translation/$LOCALE/$NAMESPACE.json",
  lexers: {
    js: ["JavascriptLexer"],
    jsx: ["JsxLexer"],

    default: ["JavascriptLexer"]
  },
};
