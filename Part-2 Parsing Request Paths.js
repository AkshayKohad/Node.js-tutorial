/*
* Primary file for the API
*
*/

//Dependencies

const http = require('http')
const url = require('url')

// The server should respond to all requests with a string

const server = http.createServer(function(req,res){
  // Get URL and parse it
  const parseUrl = url.parse(req.url,true);
  /*The parse method returns an object containing url properties*/
 // console.log(parseUrl)
    
 //get the path
 const path = parseUrl.pathname
 const trimmedPath = path.replace(/^\/+|\/+$/g,'')


 //send the response
    res.end('Hello World \n')

  // Log the request path
  console.log("Request received on path: "+ trimmedPath)
  
})

// Start the server, and have it listen on port 3000
server.listen(3000,function(){
    console.log("The server is listening on port 3000 now")
})
