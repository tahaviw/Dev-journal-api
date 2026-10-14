const fs = require("fs");

console.log("welcome to Backend !!");
const today = new Date();

console.log(today.toLocaleDateString());

fs.readFile("./data/journal.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

// exit on uncaught errors (from Node Documentation)
//process = key word representing the running program.
process.on("uncaughtException", (err) => {
  // event listener
  console.error(`There was an uncaught error: ${err}`);
  process.exit(1); //Stop the program
});
