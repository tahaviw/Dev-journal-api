const fs = require("fs");
const { v4: uuid } = require("uuid"); // similar to import v4 as uuid from "uuid"
const today = require("./getToday")
// Path Module :
const path = require("path");
const ID = uuid()
//insted of hardcoded path like :"./data/journal.txt"

//                                                first parametre takes the Error
//                                                                 V
fs.readFile(path.join(__dirname, "data", "journal.txt"), "utf8", (err, data) => {
  // utf8 turns Buffer into String
  // exemple of buffer : <Buffer 74 61 73 6b...>
  if (err) {
    console.error(err.message);
    return;
  }
  console.log("Todays Tasks:");
  console.log("");
  console.log(data);
},
);
// use fs.appendFile() to add data without deleting everything
//    V
fs.writeFile(path.join(__dirname, "data", "Reply.txt"), `Last login : ${today()} \nId: ${ID}`, (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log("Writing Complete")
})

// exit on uncaught errors (from Node Documentation)
//process = key word representing the running program

/*process.on("uncaughtException", (err) => {
  // event listener like click ordoucle click
  console.error(`There was an uncaught error: ${err}`);
  process.exit(1); //Stop the program
});*/

// Output

console.log("\x1b[34m%s\x1b[0m","     Welcome to Backend !");
console.log("\x1b[34m%s\x1b[0m","     --------------------");
console.log("Date :", today());
console.log("_".repeat(42));
console.log("\x1b[31m%s\x1b[0m","ID: ", ID);
console.log("_".repeat(42));

console.log("")
console.log("\x1b[31m%s\x1b[0m","Code:")
console.log("\x1b[31m%s\x1b[0m","====")
console.log("")
try {
  
  const jsonData = require('./data/journal.json');
  const stringJsonData = JSON.stringify(jsonData)
console.log("stringJsonData",typeof(stringJsonData))
console.log("")
const parseJsonData = JSON.parse(stringJsonData)
console.log("parseJsonData:",typeof(parseJsonData))
console.log("")
console.log(Array.isArray(parseJsonData));
console.log("")
console.log(parseJsonData[0].title);
  
} catch (err) {
  
  console.error("Error :", err);
}
console.log("")
