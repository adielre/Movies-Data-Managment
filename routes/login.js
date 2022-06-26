var express = require('express');
var router = express.Router();

const bl = require('../MODELS/usersBL');

const dal = require('../DALS/restDAL');

/* GET login page. */
router.get('/', async function(req, res, next) 
{
  res.render('login', {  msg: req.session.msg } )
});

router.post('/getUserdata', async function(req,  res, next) 
{
  let userData = await bl.isUserExist(req.body.username , req.body.pwd)

  if(userData)
  {
    // Save relevant data in session.
    req.session.credits = 0
    req.session.sessionDate = new Date()
    req.session.username = userData.username
    req.session.pwd = userData.pwd
    req.session.role = userData.role
    req.session.authenticated = true
    res.redirect("/menu")
  }
  else
  {
    req.session.msg = "User name or password are wrong !"
    res.redirect("/login")
  }
  
});

module.exports = router;
