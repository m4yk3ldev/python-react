import './App.css';
import {Component} from "react";

import MovieList from "./components/movie/list";
import MovieDetails from "./components/movie/detail";
import MovieForm from "./components/movie/form";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFilm} from '@fortawesome/free-solid-svg-icons'
import {withCookies} from "react-cookie";


class App extends Component {
    state = {
        movies: [],
        selectedMovie: null,
        editedMovie: null,
        token: this.props.cookies.get('mr-token')
    }

    componentDidMount() {
        if (this.state.token) {
            fetch(process.env.REACT_APP_API_URL + "/api/movies/", {
                method: 'GET',
                headers: {
                    "Authorization": "Token " + this.state.token
                }
            }).then(resp => resp.json())
                .then(res => {
                        if (res.detail) {
                            window.location.href = '/'
                        } else {
                            this.setState({movies: res})
                        }
                    }
                )
                .catch(error => console.log(error))
        } else {
            window.location.href = '/'
        }

    }

    movieClicked = movie => {
        this.setState({selectedMovie: movie, editedMovie: null})
    }
    movieDeleted = selMovie => {
        const movies = this.state.movies.filter(movie => movie.id !== selMovie.id);
        this.setState({movies: movies, editedMovie: null})

    }

    editClicked = selMovie => {
        this.setState({editedMovie: selMovie})

    }
    newMovie = () => {
        this.setState({editedMovie: {title: '', description: ''}})
    }
    cancelForm = () => {
        this.setState({editedMovie: null})

    }

    addMovie = movie => {
        this.setState({movies: [...this.state.movies, movie]})
    }

    render() {
        return (
            <div className="App">
                <h1><span><FontAwesomeIcon icon={faFilm}/>Movie Rater</span></h1>
                <div className="layout">
                    <MovieList movies={this.state.movies} movieClicked={this.movieClicked}
                               movieDeleted={this.movieDeleted} editClicked={this.editClicked}
                               newMovie={this.newMovie} token={this.state.token}/>
                    <div>
                        {this.state.editedMovie ? (
                            <MovieForm movie={this.state.editedMovie} cancelForm={this.cancelForm}
                                       newMovie={this.addMovie} editedMovie={this.movieClicked}
                                       token={this.state.token}/>
                        ) : (
                            <MovieDetails movie={this.state.selectedMovie} updateMovie={this.movieClicked}
                                          token={this.state.token}/>

                        )}


                    </div>
                </div>
            </div>
        );
    }
}

export default withCookies(App);