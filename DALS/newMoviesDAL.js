

const jsonfile = require('jsonfile')

const writeToFile = function(obj)
{
    return new Promise((resolve,reject) =>
    {
        jsonfile.writeFile(__dirname + "/NewMovies.json",obj,function(err)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve("ok");
            }
        })
    })
    
}

function readFile()
{
    return new Promise( (resolve,reject) => {

        jsonfile.readFile(__dirname + "/NewMovies.json", function(err, data)
        {
            if(err)
            {
               reject(err)
            }
            else
            {
                resolve(data)
            }
        })
    })
}


module.exports = { writeToFile, readFile }

