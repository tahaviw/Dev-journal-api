const fs = require("fs");
const { v4: uuid } = require("uuid"); // similar to import v4 as uuid from "uuid"
const today = new Date();

fs.readFile("./data/journal.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log("Todays Tasks:");
  console.log("");
  console.log(data);
});

// exit on uncaught errors (from Node Documentation)
//process = key word representing the running program.
process.on("uncaughtException", (err) => {
  // event listener like click ordoucle click
  console.error(`There was an uncaught error: ${err}`);
  process.exit(1); //Stop the program
});

// Output

console.log("     Welcome to Backend !!");
console.log("     ---------------------");
console.log("Date :", today.toLocaleDateString());
console.log("_".repeat(42));
console.log("ID: ", uuid());
console.log("_".repeat(42));
