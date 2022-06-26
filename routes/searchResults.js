
var express = require('express');
var router = express.Router();

const bl = require('../MODELS/moviesBL');
const usersBL = require('../MODELS/usersBL');

router.get('/', async function(req, res, next)
{
    if(req.session.authenticated)
    {
        res.render('searchResults', {movies: req.session.filtredMovies  });
    }
    else
    {
        res.redirect('/login')
    }
});

router.get('/:id', async function(req, res, next) 
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


    if(req.session.authenticated)
    {
        let movieid = req.params.id
  
        let movieData = await bl.getMovie(movieid)
      
        res.render('movieData' , {movie : movieData});
    }
    else
    {
        res.redirect('/login')
    }

});
  
module.exports = router;
