
var express = require('express');
var router = express.Router();

const bl = require('../MODELS/usersBL');

router.get('/', async function(req, res, next)
{
    if(req.session.authenticated)
    {
        let allUsers = await bl.getAllUsers()

        res.render('usersManagement', { users: allUsers});
    }
    else
    {
        res.redirect('/login')
    }
});

router.get('/:action/:id', async function(req, res, next) 
{
    if(req.session.authenticated)
    {
        if(req.params.action == "delete")
        {
            let resp = await bl.deleteUser(req.params.id)
            
            if( resp == "ok")
            {   
                res.redirect("/menu")
            }
    
        }
    
        //Cases for 'update' and 'addNew'
        req.session.usersReqParams = req.params
        res.redirect('/menu/usersManagement/userData')
    }
    else
    {
        res.redirect('/login')
    }

    
    
  });
  
module.exports = router;
