
const newMoviesDAL = require('../DALS/newMoviesDAL');
const restDAL = require('../DALS/restDAL');

async function getNumOfMovies()
{
    let resp = await restDAL.getMovies()
    let moviesData = resp.data
    return moviesData.length
}

//Retriving data from all data sources.
async function getAllMovies()
{
    //Rest API
    let resp = await restDAL.getMovies()
    let allMovies = resp.data
    let restMovies = allMovies.slice(0, 20)
    //JSON file
    let jsonData = await newMoviesDAL.readFile()
    let jsonMovies = jsonData.NewMovies

    //Data Orchestration
    return restMovies.concat(jsonMovies)
}

const getMovie = async function(movieid)
{
    let data = await getAllMovies()
    return data.find(x => x.id == movieid);
}

async function filterMovies(obj)
{
    let movies = []
    movies = await getAllMovies()

    movies.map( x => x.name = x.name.toLowerCase())
    movies.map( x => x.language = x.language.toLowerCase())
    movies.map( x => x.genres = x.genres.map( y =>  y.toLowerCase()))
      
    obj.name = obj.name.toLowerCase()
    obj.language = obj.language.toLowerCase()
    obj.genres = obj.genres.toLowerCase()

    let results = []
    for (key in obj) 
    {
        if( obj[key] )
        {
            results = movies.filter(movie => movie[key].includes(obj[key]))
            if(results.length === 0)
            {
                results = []
                break
            }
            else
            {
                movies = results
            }
        }  
    }

    let object = []
    movies = []
    movies = await getAllMovies()
    movies.map( x => x.name = x.name.toLowerCase())
    movies.map( x => x.language = x.language.toLowerCase())
    movies.map( x => x.genres = x.genres.map( y =>  y.toLowerCase()))

    results.forEach(result => 
    {
        let moviesResults = []
        result.genres.forEach(genre =>
        {
            let arr = movies.filter(movie => movie.genres.includes(genre))
            arr.forEach(element => 
            {
                moviesResults.push(element)
            })  
        })
       
        moviesResults = moviesResults.map(item => 
        { 
            return {id: item.id, name: item.name} 
        }); 

        moviesResults = moviesResults.filter(x => x.name != result.name)

        object.push({id: result.id, name: result.name, linkedMovies: moviesResults})
    });

    return object
}

// This function add new movie to json file.
async function addMovie(movie)
{
    let obj
    let keys =  Object.keys(movie)
    let movieGenres = keys.slice(2, keys.length )
    let allData = await newMoviesDAL.readFile()
    let allNewMovies = allData.NewMovies
   
    if(allNewMovies == undefined || allNewMovies =="")
    {
        // First movie addition
        let lastID = await getNumOfMovies()
        let firstID = lastID + 1
        
        obj = { NewMovies: [ { id: firstID, name: movie.movieName, language: movie.movieLanguage , genres: movieGenres} ] }
    }
    else
    {
        let nextID = allNewMovies[ allNewMovies.length-1 ].id + 1
        allNewMovies.push({id: nextID, name: movie.movieName, language: movie.movieLanguage , genres: movieGenres})
        obj = { NewMovies: allNewMovies }
    }

    let status = await newMoviesDAL.writeToFile(obj)

    return status
}


module.exports = { addMovie, filterMovies, getMovie }
