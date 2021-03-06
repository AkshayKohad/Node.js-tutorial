// One thing to note is for any mode we need to define it on command line for eg NODE_env=staging or NODE_ENV=production node Main_File

/*
* Create and export configuration variables
*
*/

// Container for all the environments
var environments = {}

// Staging (default) environment
environments.staging = {
    'port' : 3000,
    'envName' : 'staging'
}

//Production environment
environments.production = {
    'port' : 5000,
    'envName' : 'production'
}

// Determine which environment was passed as a command-line argument

var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : ''

// check that the current environment is one of the environments above, if not, default to staging

var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging

//Export the module
module.exports = environmentToExport
