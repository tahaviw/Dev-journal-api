const http = require("http")
const PORT = process.env.PORT;

const server = http.createServer((req, res) => {
    console.log(req.method);
    console.log(req.url);

    try {
        let data = ""
        let statusCode = 200
        if (req.method === 'GET') {
            // Switch statement replace IF statement (same)
            switch (req.url) {
                case '/':
                    data = 'Welcome:\n Homepage'
                    break;
                case '/about':
                    data = 'About:\n This Backend project is to implement\n my Knowledge and current learning'
                    break;
                default:
                    data = 'Not Found'
                    statusCode = 404
                        ;
            }
        } else {
            // Methode not allowed => 405
            data = 'Methode Not allowed'
            statusCode = 405
            console.log('Only GET methode is accepted')
        }
                    // combines the statusCode to send & Content type (ex: html, plain, txt ..)
                    //           V
                    res.writeHead(statusCode, { 'content-type': 'text/plain' })
                    res.end(data)
    } catch (error) {
        // SERVER Error 500
        res.writeHead(500, { 'content-type': 'text/plain' })
        res.end('server Error')
    }
})

server.listen(PORT, () => {
    console.log(`Server Running on Port : ${PORT}`)
})