

var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next)
{
    if(!req.session.authenticated)
    {
        res.redirect('/login')
    }

});

module.exports = router;
