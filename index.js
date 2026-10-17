const fs = require("fs");
const { v4: uuid } = require("uuid"); // similar to import v4 as uuid from "uuid"
const today = new Date();
// Path Module :
const path = require("path");
//insted of hardcoded path like :"./data/journal.txt"

//                                                first parametre takes the Error
//                                                                ⬇️
fs.readFile(path.join(__dirname, "data", "journal.txt"), "utf8", (err, data) => {
  // utf8 turns Buffer into String
  // exemple of buffer : <Buffer 74 61 73 6b...>
  if (err) throw err;
  console.log("Todays Tasks:");
  console.log("");
  console.log(data);
},
);

fs.appendFile(path.join(__dirname, "data", "Reply.txt"), " This Is the Reply", (err) => {
  if (err) throw err;
  console.log("Writing Complete")
})

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
