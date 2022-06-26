

var express = require('express');
var router = express.Router();

const bl = require('../MODELS/usersBL');

router.post('/getdata', async function(req, res, next)
{
    let userParams = req.session.usersReqParams
    if(userParams.action == "update")
    {
        let respUpdate = await bl.updateUser(userParams.id, req.body)
        if(respUpdate == "ok")
            res.redirect('/menu' )
    }
    else if( userParams.action == "addNew")
    {
        let respAdduser = await bl.addUser(req.body)
        if(respAdduser == "ok")
            res.redirect('/menu' )
    }
     
});

router.get('/', async function(req, res, next)
{
    if(req.session.authenticated)
    {
        let userParams = req.session.usersReqParams
        let userData = ""
        if(userParams.id != 0)
            userData = await bl.getUserById(userParams.id)
        res.render('userData', { params: userParams, user: userData} )
    }
    else
    {
        res.redirect('/login')
    }
    
});

module.exports = router;
