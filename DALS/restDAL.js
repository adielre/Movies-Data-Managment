

const axios = require('axios');

const addMovie = function(obj)
{
    return axios.post("https://api.tvmaze.com/shows",obj)
}

const getMovies = function()
{
    return axios.get("https://api.tvmaze.com/shows")
}

module.exports = { addMovie, getMovies }