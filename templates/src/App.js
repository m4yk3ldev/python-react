import './App.css';
import {Component} from "react";

import MovieList from "./components/movie/list";
import MovieDetails from "./components/movie/detail";
import MovieForm from "./components/movie/form";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFilm} from '@fortawesome/free-solid-svg-icons'


class App extends Component {
    state = {
        movies: [],
        selectedMovie: null,
        editedMovie: null,
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + "/api/movies/", {
            method: 'GET',
            headers: {
                "Authorization": "Token ba8e52d0d1878e1702d7d90e0cb6f41ae5745870"
            }
        }).then(resp => resp.json())
            .then(res => {
                this.setState({movies: res});
            })
            .catch(error => console.log(error))
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
                               newMovie={this.newMovie}/>
                    <div>
                        {this.state.editedMovie ? (
                            <MovieForm movie={this.state.editedMovie} cancelForm={this.cancelForm}
                                       newMovie={this.addMovie} editedMovie={this.movieClicked}/>
                        ) : (
                            <MovieDetails movie={this.state.selectedMovie} updateMovie={this.movieClicked}/>

                        )}


                    </div>
                </div>
            </div>
        );
    }
}

export default App;