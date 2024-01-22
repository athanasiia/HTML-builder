const promises = require("fs/promises");
const path = require("path");
const fs = require("fs");

function bundleCss (dir, destFile) {
  const files = promises.readdir(dir, {withFileTypes: true});
  let filesToBundle = [];

  files.then((readingResult) => {
    for (res of readingResult) {
      if (res.isFile()) {
        let parsedName = path.parse(res.name);
        if (path.extname(parsedName.base) === ".css") {
          filesToBundle.push(parsedName.base);
        }
      }
    }
    
    bundleFiles(dir, filesToBundle, destFile);
  });
}

function bundleFiles (dir, files, destFile) {
  const writableStream = fs.createWriteStream(destFile);
  for (file of files) {
    const readableStream = fs.createReadStream(path.join(dir, file));   
    readableStream.pipe(writableStream);
  }
}

bundleCss(path.join(__dirname, "styles"), path.join(__dirname, "project-dist", "bundle.css"));