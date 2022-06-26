

var express = require('express');
var router = express.Router();

const bl = require('../MODELS/moviesBL');
const usersBL = require('../MODELS/usersBL');

var genres = [
    '', 'Drama',     'Science-Fiction',
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

var languages = ['',"English", "Japanese"]

router.post('/searchResults', async function(req, res, next) 
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

    //Input validation.
    if( (!req.body.name && !req.body.language && !req.body.genres))
        res.render('searchMovies', {genres, languages, msg: 'Must enter a value at least one field.'});
    
    
    let filtredMovies = await bl.filterMovies(req.body)

    req.session.filtredMovies = filtredMovies

    res.render("searchResults", { movies: filtredMovies } )

});

router.get('/', async function(req, res, next)
{
    if(req.session.authenticated)
    {
        res.render('searchMovies', { genres, languages, msg: ''});
    }
    else
    {
        res.redirect('/login')
    }
});

module.exports = router;
