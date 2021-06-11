// Note this is a module which we made to manage JSON data(basically CRUD operations)
/*
* Library for storing and editing data
*
*/

// Dependencies
var fs = require('fs')
var path = require('path')

// Container for the module (to be exported)
var lib = {}

// Base directory of the data folder
lib.baseDir = path.join(__dirname,'/../.data/')
// What the above function does is it joins the path of current directory (__dirname) with the path we have given as 
// second parameter


// Write data to a file
lib.create = function(dir,file,data,callback){
    // Open the file for writing
    fs.open(lib.baseDir+dir+'/'+file+'.json','wx',function(err,fileDescriptor){
        // fileDescriptor is a way to uniquely identify specific file
        //Basically It is a string, Buffer, URL or file description integer that denotes the path of the file 

        if(!err &&  fileDescriptor){
           // Convert data to string
           var stringData = JSON.stringify(data)

           // Write to file and close it
           fs.writeFile(fileDescriptor,stringData,function(err){
             if(!err){
               fs.close(fileDescriptor,function(err){
                  // console.log(fileDescriptor)
                   if(!err){
                      callback(false)       
                   } else {
                       callback('Error closing new file')
                   }
               })
             } else{
                 callback('Error writing to new file')
             } 
           })
        } else{
            callback('Could not create new file, it may already exist')
        }
    })
}

// Read data from a file
lib.read = function(dir,file,callback){
    fs.readFile(lib.baseDir+dir+'/'+file+'.json','utf8',function(err,data){
        callback(err,data)
    })
}

//Update data inside a file
lib.update = function(dir,file,data,callback){
    // Open the file for writing 
    fs.open(lib.baseDir+dir+'/'+file+'.json','r+',function(err,fileDescriptor){
        if(!err && fileDescriptor){
           // Convert data to string
           var stringData = JSON.stringify(data)
           
           // Truncate the file
           fs.truncate(fileDescriptor,function(err){
               if(!err){
                 //Write to the file and close it
                 fs.writeFile(fileDescriptor,stringData,function(err){
                   if(!err)
                   {
                       fs.close(fileDescriptor,function(err){
                           if(!err){
                               callback(false)
                           } else{
                               callback('Error closing existing file')
                           }
                       })
                   }  else {
                       callback('Error writing to existing file')
                   }
                 })
               } else {
                   callback('Error truncating file')
               }
           })
        } else {
            callback('Could not open file for updating, It may not exixt yet')
        }
    })
}


// Delete a file

lib.delete = function(dir,file,callback){
    // Unlink the file
    fs.unlink(lib.baseDir+dir+'/'+file+'.json',function(err){
        if(!err){
            callback(false)
        } else {
            callback('Error deleting file')
        }
    })
}


// Export the module
module.exports = lib

