
var express = require('express');
var router = express.Router();

const bl = require('../MODELS/usersBL');

router.get('/', async function(req, res, next)
{
    if(req.session.authenticated)
    {
        res.render('menu', {roleUser: req.session.role});
    }
    else
    {
        res.redirect('/login')
    }
  
});

module.exports = router;
