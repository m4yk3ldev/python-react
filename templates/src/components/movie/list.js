import React from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {faEdit} from "@fortawesome/free-regular-svg-icons";

function MovieList(props) {
    const movieClicked = movie => {
        props.movieClicked(movie)
    }
    const removeClicked = movie => {
        props.movieClicked(movie)
    }
    const editClicked = movie => {
        alert(movie)
    }

    return (
        <div>
            {
                props.movies.map(movie => {
                    return (
                        <div key={movie.id}>
                            <h3 onClick={() => movieClicked(movie)}>{movie.title}</h3>
                            <FontAwesomeIcon icon={faEdit} onClick={() => editClicked(movie)}/>
                            <FontAwesomeIcon icon={faTrash} onClick={() => removeClicked(movie)}/>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default MovieList;