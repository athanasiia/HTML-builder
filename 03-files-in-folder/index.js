const path = require("path");
const promises = require("fs/promises");
const fs = require("fs");

const files = promises.readdir(path.join(__dirname, "secret-folder"), {withFileTypes: true});

files.then((readingResult) => {
  for (res of readingResult) {
    if (res.isFile()) {
      let parsedName = path.parse(res.name);
      fs.stat(path.join(__dirname, "secret-folder", res.name), (err, stats) => {
        console.log(`${parsedName.name} - ${path.extname(parsedName.base).slice(1)} - ${stats.size} bytes`);
      });
    }
  }
});