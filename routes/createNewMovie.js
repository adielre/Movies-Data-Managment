
var express = require('express');
var router = express.Router();

const bl = require('../MODELS/moviesBL');
const usersBL = require('../MODELS/usersBL');

var genres = [
    'Drama',     'Science-Fiction',
    'Thriller',  'Action',
    'Crime',     'Horror',
    'Romance',   'Adventure',
    'Espionage', 'Music',
    'Mystery',   'Supernatural',
    'Fantasy',   'Family',
    'Anime',     'Comedy',
    'History',   'Medical',
    'Legal',     'Western',
    'War',       'Sports'
]

router.get('/', async function(req, res, next) 
{
    if(req.session.authenticated)
    {
        res.render('createNewMovie', { genres } )
    }
    else
    {
        res.redirect('/login')
    }

});

router.post('/getdata', async function(req, res, next) 
{
     //Credis checking per user.
     if( usersBL.isDatesEquals(new Date(), new Date(req.session.sessionDate) ) )
     {      
         req.session.credits += 1
 
         let numOfTransacions = await usersBL.getNumOfTransactions(req.session.username , req.session.pwd)
 
         if(req.session.credits > numOfTransacions)
         {
             req.session.msg = "User has no more credits to perform operations for that day."
             res.redirect("/login")
         }
     }
     else
     {
         req.session.credits = 1
     }

    let status = await bl.addMovie(req.body)

    if(status == 'ok')
    {
        res.redirect("/menu")
    }
    else
    {
        res.send('Failed to add new movie.');
    }
});

module.exports = router;
