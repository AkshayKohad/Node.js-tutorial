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

req.on("data",function(chunk){
    buffer += decoder.write(chunk)

})

req.on("end",function(){
    buffer += decoder.end()

//choose the handler this request should go to, If one is not found,use the notFound handler

var chosenHandler = typeof(router[trimmedPath]) !== "undefined"? router[trimmedPath] : handlers.notFound

//Construct the data object to send to the handler

var data = {
  "trimmedPath":trimmedPath,
  "queryStringObject":queryStringObject,
  "method":method,
  "headers":headers,
  "payload":buffer
}

// Route the request to the handler specified in the router
chosenHandler(data,function(statusCode,payload){
  //Use the status code called back my the handler,or default to 200
   statusCode = typeof(statusCode) == "number" ? statusCode: 200


  //Use the payload called back by the handler,or default to an empty object
  payload = typeof(payload) == "object" ? payload : {}
  
   // Convert the payload object to string
    var payloadString = JSON.stringify(payload)

    // Return the response
    res.writeHead(statusCode)
    //res.end(payload)  -> we cannot print this function as it is  object  
    //it will give us error first we need to convert it in string that is done using JSON.stringify as above 
     // but we can do console.log to object as done below
    //console.log(payload)

    res.end(payloadString)

      // Log the request headers 
 // console.log(data)

   console.log("Returning this response: ",statusCode,payloadString)
  
})

})
 
})

// Start the server, and have it listen on port 3000
server.listen(3000,function(){
    console.log("The server is listening on port 3000 now")
})

//Define the handlers
var handlers = {}

//sample handler
handlers.sample = function(data,callback){
 // callBack a http status code, and a payload object
 callback(406,{"name" : "sample handler"})
}


// Not found Handler
handlers.notFound = function(data,callback){
  callback(404)
}

//Define a request router
var router = {
  "sample" : handlers.sample
}
