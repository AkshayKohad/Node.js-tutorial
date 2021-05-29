// Note one thing that like we do localhost:3000 for making local server on web browser, simply putting localhost:3000 
// but if we want to access it not terminal itself we do curl localhost:3000

/*
* Primary file for the API
*
*/

//Dependencies

const http = require('http')

// The server should respond to all requests with a string

const server = http.createServer(function(req,res){
    res.end('Hello World \n')
})

// Start the server, and have it listen on port 3000
server.listen(3000,function(){
    console.log("The server is listening on port 3000 now")
})
