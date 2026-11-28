const http = require("http");
const { json } = require("stream/consumers");
const PORT = process.env.PORT || 8000;

// Temporary demo users (in-memory database)
const users = [
  { id: 1, name: "taha" },
  { id: 2, name: "yussef" },
  { id: 3, name: "ilias" },
];

// Create the HTTP server
const server = http.createServer((req, res) => {
  // Log the incoming request method (GET, POST, etc.) and URL path
  console.log(req.method);
  console.log(req.url);

  try {
    // Default response values
    let data = "";
    let statusCode = 200;
    let contentType = "text/plain";

    // Only handle GET requests
    if (req.method === "GET") {
      // Split the URL by "/" to examine path segments
      // Example: "/api/users/2" -> ['', 'api', 'users', '2']
      const parts = req.url.split("/");
      let ID = Number(parts[3]);

      if (req.url === "/") {
        // Homepage route
        console.log('Welcome Home')
        data = "Welcome:\n Homepage";
        statusCode = 200
      } else if (req.url === "/about") {
        // About page route
        data = 'About:\n This Backend project is to implement\n my Knowledge and current learning'
        statusCode = 200
      } else if (req.url === '/api/users') {
        data = JSON.stringify(users)
        statusCode = 200
      } else {
        // Any other URL that doesn't match above cases
        data = 'Not Found'
        statusCode = 404       // 404 Not Found
        contentType = 'text/plain'
      }
      
      if (req.url.match(/\/api\/users\//) && (Number.isNaN(ID) || ID <= 0 || !Number.isInteger(ID))) {
        console.log("request invalid only numbers are allowed")
        data = 'request Invalid'
        statusCode = 400     // 400 Bad Request
        contentType = 'text/plain'
      } else if (req.url.match(/\/api\/users\/([0-9]+)/)) {
        let usr = users.find(x => x.id === ID)
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

    } else {
      // Any method that is not GET (POST, PUT, DELETE, etc.)
      data = "Methode Not allowed yet";
      statusCode = 405; // 405 Method Not Allowed
      contentType = "text/plain";
      console.log("Only GET methode is accepted");
    }

    // Send the HTTP response headers with status code and content type
    res.writeHead(statusCode, { "content-type": contentType });
    // Send the response body and end the request
    res.end(data);
  } catch (error) {
    // If anything crashes inside the try block, return 500 Server Error
    res.writeHead(500, { "content-type": "text/plain" });
    res.end("server Error");
  }
});

// Start listening for incoming requests on the configured port
server.listen(PORT, () => {
  console.log(`Server Running on Port : ${PORT}`);
});
