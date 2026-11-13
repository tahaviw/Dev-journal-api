const http = require("http")
const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log(req.method);
    console.log(req.url);

    switch(req.url){
        case '/': 
        // combines the statusCode to send & Content type (ex: html, plain, txt ..)
        //           V
            res.writeHead(200, {'content-type': 'text/plain'})
            res.end('Welcome:\n HOMEPAGE')
        break;
        case '/about':
            res.writeHead(200, {'content-type': 'text/plain'})
            res.end('About:\n This Backend project is to implement\n my Knowledge and current learning')
        break;
    }
})

server.listen(PORT, () => {
    console.log(`Server Running on Port : ${PORT}`)
})