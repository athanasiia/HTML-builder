const path = require("path");
const promises = require("fs/promises");

function copyDir(toBeCopiedPath, toCopyPath) {
  const files = promises.readdir(toBeCopiedPath, {withFileTypes: true});
  files.then((readingResult) => {
    let namesArray = [];
    for (res of readingResult) {
      let parsedName = path.parse(res.name);
      promises.copyFile(path.join(toBeCopiedPath, parsedName.base), path.join(toCopyPath, parsedName.base));
      namesArray.push(parsedName.base);
    }

    const copiedFiles = promises.readdir(toCopyPath, {withFileTypes: true});
    copiedFiles.then((copiedReadingResult) => {
      for (res of copiedReadingResult) {
        let parsedName = path.parse(res.name);
        if (!namesArray.includes(parsedName.base)) {
          promises.rm(path.join(toCopyPath, parsedName.base));
        }
      }
    })
  })
}

promises.mkdir(path.join(__dirname, "files-copy"), {recursive: true});

copyDir(path.join(__dirname, "files"), path.join(__dirname, "files-copy"));