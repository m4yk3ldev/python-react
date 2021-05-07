import React from "react";


function MovieList(props) {
    const movieClicked = movie => event => {
        props.movieClicked(movie)
    }
    return (
        <div>
            {
                props.movies.map(movie => {
                    return (
                        <div onClick={movieClicked(movie)} key={movie.id}>
                            <h3>{movie.title}</h3>

                        </div>
                    )
                })
            }
        </div>
    )
}

export default MovieList;