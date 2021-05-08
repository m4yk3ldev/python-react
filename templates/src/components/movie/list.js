import React from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {faEdit} from "@fortawesome/free-regular-svg-icons";

function MovieList(props) {
    const movieClicked = movie => {
        props.movieClicked(movie)
    }
    const removeClicked = movie => {
        fetch(process.env.REACT_APP_API_URL + "/api/movies/" + movie.id, {
            method: 'DELETE',
            headers: {
                "Authorization": "Token ba8e52d0d1878e1702d7d90e0cb6f41ae5745870",
                "Content-Type": 'application/json'
            },
        }).then(resp => props.movieDeleted(movie))
            .catch(error => console.log(error))
    }
    const editClicked = movie => {
        props.editClicked(movie)
    }

    const newMovie = () => {
        props.newMovie();
    }

    return (
        <div>
            {
                props.movies.map(movie => {
                    return (
                        <div key={movie.id} className="movie-item">
                            <h3 onClick={() => movieClicked(movie)}>{movie.title}</h3>
                            <FontAwesomeIcon icon={faEdit} onClick={() => editClicked(movie)}/>
                            <FontAwesomeIcon icon={faTrash} onClick={() => removeClicked(movie)}/>
                        </div>
                    )
                })
            }
            <button onClick={newMovie}>Add new</button>
        </div>
    )
}

export default MovieList;