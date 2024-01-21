const fs = require("fs");
const path = require("path");
const readline = require("readline");

const writableStream = fs.createWriteStream(path.join(__dirname, "text.txt"));

const rl = readline.createInterface(process.stdin);

process.stdout.write("Enter text to write in text.txt:\n");

rl.on("line", (data) => {
  if (data === "exit") {
    process.exit();
  }
  writableStream.write(`${data}\n`);
});

process.on("SIGINT", () => process.exit());

process.on("exit", () => {
  process.stdout.write("Bye!");
})