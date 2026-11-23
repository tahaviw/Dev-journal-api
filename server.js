const http = require("http")
const PORT = process.env.PORT || 8000;

// Temporary demo users (in-memory database)
const users = [
    { id: 1, name: "taha" },
    { id: 2, name: "yussef" },
    { id: 3, name: "ilias" },
]

// Create the HTTP server
const server = http.createServer((req, res) => {
    // Log the incoming request method (GET, POST, etc.) and URL path
    console.log(req.method);
    console.log(req.url);

    try {
        // Default response values
        let data = ""                 // Body content to send back
        let statusCode = 200          // HTTP status code (200 = OK by default)
        let contentType = 'text/plain' // MIME type of the response

        // Only handle GET requests
        if (req.method === 'GET') {
            // Split the URL by "/" to examine path segments
            // Example: "/api/users/2" -> ['', 'api', 'users', '2']
            const parts = req.url.split("/")
            // Try to convert the 4th segment (index 3) into a number (the user ID)
            let ID = Number(parts[3])

            // Check if the request is for /api/users/something and the ID is not a valid number
            // parts.length > 3   : make sure there is a 4th segment
            // parts[1] === 'api' : second segment is "api"
            // parts[2] === 'users': third segment is "users"
            // Number.isNaN(ID)   : the ID is not a valid number (e.g. "/api/users/abd")
            if (parts.length > 3 && parts[1] === 'api' && parts[2] === 'users' && Number.isNaN(ID)) {
                console.log("request invalid only numbers are allowed")
                data = 'request Invalid'
                statusCode = 400     // 400 Bad Request
                contentType = 'text/plain'
            } else {
                // Switch on the exact URL path to decide what to return
                switch (req.url) {
                    case '/':
                        // Homepage route
                        data = 'Welcome:\n Homepage'
                        contentType = 'text/plain'
                        break;
                    case '/about':
                        // About page route
                        data = 'About:\n This Backend project is to implement\n my Knowledge and current learning'
                        contentType = 'text/plain'
                        break;
                    case `/api/users`:
                        // Return ALL users as JSON
                        data = JSON.stringify(users)
                        contentType = 'application/json'
                        break;
                    case `/api/users/${ID}`:
                        // Return ONE user by ID
                        let usr = users.find(x => x.id === ID)
                        if (usr) {
                            // User found: send their data as JSON
                            console.log(usr)
                            data = JSON.stringify(usr)
                            contentType = 'application/json'
                        } else {
                            // User not found in the array
                            data = 'User Not Found'
                            statusCode = 404   // 404 Not Found
                            contentType = 'text/plain'
                        }
                        break;
                    default:
                        // Any other URL that doesn't match above cases
                        data = 'Not Found'
                        statusCode = 404       // 404 Not Found
                        contentType = 'text/plain'
                }
            }
        } else {
            // Any method that is not GET (POST, PUT, DELETE, etc.)
            data = 'Methode Not allowed'
            statusCode = 405                 // 405 Method Not Allowed
            contentType = 'text/plain'
            console.log('Only GET methode is accepted')
        }

        // Send the HTTP response headers with status code and content type
        res.writeHead(statusCode, { 'content-type': contentType })
        // Send the response body and end the request
        res.end(data)
    } catch (error) {
        // If anything crashes inside the try block, return 500 Server Error
        res.writeHead(500, { 'content-type': 'text/plain' })
        res.end('server Error')
    }
})

// Start listening for incoming requests on the configured port
server.listen(PORT, () => {
    console.log(`Server Running on Port : ${PORT}`)
})