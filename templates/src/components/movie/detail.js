import React, {Component} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'

class MovieDetails extends Component {
    state = {
        highlighted: -1,
        token: this.props.token
    }

    highlightRate = high => {
        this.setState({highlighted: high})
    }

    rateClicked = stars => {
        fetch(process.env.REACT_APP_API_URL + "/api/movies/" + this.props.movie.id + "/rate_movie/", {
            method: 'POST',
            headers: {
                "Authorization": "Token " + this.state.token,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({stars: stars})
        }).then(resp => resp.json()).then(res => this.getDetails())
            .catch(error => console.log(error))
    }
    getDetails = () => {
        fetch(process.env.REACT_APP_API_URL + "/api/movies/" + this.props.movie.id + "/", {
            method: 'GET',
            headers: {
                "Authorization": "Token " + this.state.token,
                "Content-Type": 'application/json'
            },
        }).then(resp => resp.json()).then(res => this.props.updateMovie(res))
            .catch(error => console.log(error))
    }

    render() {
        const mov = this.props.movie
        return (
            <div>
                <h3>Detalles de la pelicula</h3>
                {mov ? (
                    <div>
                        <h3>{mov.title}</h3>
                        <FontAwesomeIcon icon={faStar}
                                         color={mov.avg_rating > 0 ? 'orange' : ''}/>
                        <FontAwesomeIcon icon={faStar}
                                         color={mov.avg_rating > 1 ? 'orange' : ''}/>
                        <FontAwesomeIcon icon={faStar}
                                         color={mov.avg_rating > 2 ? 'orange' : ''}/>
                        <FontAwesomeIcon icon={faStar}
                                         color={mov.avg_rating > 3 ? 'orange' : ''}/>
                        <FontAwesomeIcon icon={faStar}
                                         color={mov.avg_rating > 4 ? 'orange' : ''}/>
                        ({mov.no_of_ratings})
                        <p>{mov.description}</p>
                        <br/>
                        <div className="rate-container">
                            <br/>
                            <h2>Rate it !!!</h2>
                            {[...Array(5)].map((e, i) => {
                                return <FontAwesomeIcon key={i} icon={faStar}
                                                        color={this.state.highlighted > i - 1 ? 'purple' : ''}
                                                        onMouseEnter={() => this.highlightRate(i)}
                                                        onMouseLeave={() => this.highlightRate(-1)}
                                                        onClick={() => this.rateClicked(i + 1)}/>
                            })}
                        </div>
                    </div>
                ) : null}
            </div>
        )
    }


}

export default MovieDetails;