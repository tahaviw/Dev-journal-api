const http = require("http")
const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log(req.method);
    console.log(req.url);
})

server.listen(PORT, () => {
    console.log(`Server Running on Port : ${PORT}`)
})