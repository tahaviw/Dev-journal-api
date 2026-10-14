const fs = require("fs");

console.log("welcome to Backend !!");
const today = new Date();

console.log(today.toLocaleDateString());

fs.readFile("./data/journal.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
