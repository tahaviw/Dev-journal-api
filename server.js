const http = require("http")
const PORT = process.env.PORT || 8000;

// Temp Demo

const users = [
    { id: 1, name: "taha" },
    { id: 2, name: "yussef" },
    { id: 3, name: "ilias" },
]

const server = http.createServer((req, res) => {
    console.log(req.method);
    console.log(req.url);

    try {
        let data = ""
        let statusCode = 200
        let contentType = 'text/plain'
        if (req.method === 'GET') {
            const parts = req.url.split("/")
            let ID = Number(parts[3])
            // Switch statement replace IF statement (same)
            switch (req.url) {
                case '/':
                    data = 'Welcome:\n Homepage'
                    contentType = 'text/plain'
                    break;
                case '/about':
                    data = 'About:\n This Backend project is to implement\n my Knowledge and current learning'
                    contentType = 'text/plain'
                    break;
                case `/api/users`:
                    data = 'Specify The User you want to reach'
                    contentType = 'application/json'
                    break;
                case `/api/users/${ID}`:
                    let usr = users.find(x => x.id === ID)
                    console.log(usr)
                    data = JSON.stringify(usr)
                    contentType = 'application/json'
                    break;
                default:
                    data = 'Not Found'
                    statusCode = 404
                    contentType = 'text/plain'
                        ;
            }
        } else {
            // Methode not allowed => 405
            data = 'Methode Not allowed'
            statusCode = 405
            contentType = 'text/plain'
            console.log('Only GET methode is accepted')
        }
        // combines the statusCode to send & Content type (ex: html, plain, txt ..)
        //           V
        res.writeHead(statusCode, { 'content-type': contentType })
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