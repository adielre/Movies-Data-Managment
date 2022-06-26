//const restDAL = require('../DAL/restDAL');
const usersDAL = require('../DALS/usersDAL');

/*const getRoleUser = async function(username, pwd)
{   
    let usersData = await usersDAL.readUsersFile();
    let users = usersData.users;

    let obj = users.find(x => x.username == username && x.pwd == pwd);
    return obj.role
}*/

const addUser = async function(obj)
{   
    let allUsers = await getAllUsers()
    let lastID = allUsers[allUsers.length-1].id
    let nextID = lastID + 1
    allUsers.push( {"id": nextID, "username": obj.username,"pwd": obj.pwd, "CreatedDate":"null","NumOfTransactions":"3","role":"null"})
    let newData = { "users" : allUsers }
    let resp = await usersDAL.writeUsersFile(newData)
    return resp
}

const updateUser = async function(userid, obj)
{   
    let allUsers = await getAllUsers()
    allUsers.forEach(user => 
    {
        if(user.id == userid)
        {
            user.username = obj.username
            user.pwd = obj.pwd
        }
    });
    let data = { "users" : allUsers }
    let resp = await usersDAL.writeUsersFile(data)
    return resp
}

const deleteUser = async function(userid)
{   
    let allUsers = await getAllUsers()
    //Delete the user by filter all user that different userid
    let newArray = allUsers.filter(x => x.id != userid)
    let data = { "users" : newArray }
    let resp = await usersDAL.writeUsersFile(data)
    return resp
}

const getUserById = async function(userid)
{   
    let allUsers = await getAllUsers()
    let result = allUsers.filter(x => x.id == userid)
    let userData = result[0]
    return userData
}

const getAllUsers = async function()
{   
    let fileData = await usersDAL.readUsersFile();
    let users = fileData.users;
    return users
}

const getNumOfTransactions = async function(username, pwd)
{   
    let usersData = await usersDAL.readUsersFile();
    let users = usersData.users;

    let obj = users.find(x => x.username == username && x.pwd == pwd);
    return obj.NumOfTransactions
}

//If the user is exist, the function will return that Json.
const isUserExist = async function(username, pwd)
{   
    let usersData = await usersDAL.readUsersFile();
    let usersLogindata = usersData.users;

    let obj = usersLogindata.find(x => x.username == username && x.pwd == pwd);

    if(obj)
    {
        return obj;
    }
    else
    {
        return false;
    }
}

const isDatesEquals = function(date1, date2 )
{
    return date1.getDate() == date2.getDate() && date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear()
}

module.exports = {isUserExist, getNumOfTransactions, isDatesEquals, getAllUsers, deleteUser, getUserById, updateUser, addUser /*, getRoleUser*/}