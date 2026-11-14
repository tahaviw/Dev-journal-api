const http = require("http")
const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log(req.method);
    console.log(req.url);

    try {
        if (req.method === 'GET') {
            // Switch statement replace IF statement (same)
            switch (req.url) {
                case '/':
                    // combines the statusCode to send & Content type (ex: html, plain, txt ..)
                    //           V
                    res.writeHead(200, { 'content-type': 'text/plain' })
                    res.end('Welcome:\n HOMEPAGE')
                    break;
                case '/about':
                    res.writeHead(200, { 'content-type': 'text/plain' })
                    res.end('About:\n This Backend project is to implement\n my Knowledge and current learning')
                    break;
                default:
                    res.writeHead(404, { 'content-type': 'text/plain' })
                    res.end('Not found')
                        ;
            }
        } else {
            // Methode not allowed => 405
            res.writeHead(405, { 'content-type': 'text/plain' })
            res.end('Methode not allowed')
            console.error('Only GET methode is accepted')
        }
    } catch (error) {
        // SERVER Error 500
        res.writeHead(500, { 'content-type': 'text/plain' })
        res.end('server Error')
    }
})

server.listen(PORT, () => {
    console.log(`Server Running on Port : ${PORT}`)
})