
const jFile = require('jsonfile')
    
const readUsersFile = function()
{
    return new Promise((resolve,reject) =>
    {
        jFile.readFile(__dirname + "/users.json", (err, data) =>
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(data)
            }
        })
    })
}

async function writeUsersFile(data)
{ 
    return new Promise( (resolve,reject)=>
    {
        jFile.writeFile(__dirname + "/users.json", data, function(err)
        {
            if(err)
            {
               reject(err)
            }
            else
            {
                resolve('ok')
            }
        })
    })
}

module.exports = {readUsersFile, writeUsersFile}