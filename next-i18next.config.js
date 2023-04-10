const path = require("path");
module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["def", "en", "ar"],
    localeDetection: false,
    localePath: path.resolve("./public/locales"),
  },
  trailingSlash: true,
};
