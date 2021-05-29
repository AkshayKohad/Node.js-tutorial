//For payloads we can add content in body section in postman to check

/*
* Primary file for the API
*
*/

//Dependencies

const http = require('http')
const url = require('url')
const StringDecoder = require("string_decoder").StringDecoder

// The server should respond to all requests with a string

const server = http.createServer(function(req,res){
  // Get URL and parse it
  const parseUrl = url.parse(req.url,true);
  /*The parse method returns an object containing url properties*/
 // console.log(parseUrl)
    
 //get the path
 const path = parseUrl.pathname
 const trimmedPath = path.replace(/^\/+|\/+$/g,'')

// Get the query string as an object

// the query string is something which has some query like localhost:3000/path?name:need_to_know
// so {name:need_to_know} is query object, so basically it is something after question mark
const queryStringObject = parseUrl.query

 // Get the http method from req object
  const method = req.method.toLowerCase()


  // get headers as an object
  const headers = req.headers


// Get the payloads if any
const decoder = new StringDecoder("utf-8")
var buffer = ""

req.on("data",function(data){
    buffer += decoder.write(data)

})

req.on("end",function(){
    buffer += decoder.end()
// even though you have any payload or not this function will always execute 
//so let us keep below to line in this function itself rather than outside the function
    //send the response
    res.end('Hello World \n')

  // Log the request headers 
  console.log("Request received with this payload: ",buffer)
  // for above thing queryStringObject is object so we use ',' instead of '+'
})
 

})

// Start the server, and have it listen on port 3000
server.listen(3000,function(){
    console.log("The server is listening on port 3000 now")
})
