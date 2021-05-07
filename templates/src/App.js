import './App.css';
import {Component} from "react";

import MovieList from "./components/movie/list";
import MovieDetails from "./components/movie/detail";


class App extends Component {
    state = {
        movies: [],
        selectedMovie: null
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + "/api/movies/", {
            method: 'GET',
            headers: {
                "Authorization": "Token 06ec4b621d5c3a32730c87ecd69fbf20e36c5b9c"
            }
        }).then(resp => resp.json())
            .then(res => {
                this.setState({movies: res});
            })
            .catch(error => console.log(error))
    }

    movieClicked = movie => {
        this.setState({selectedMovie: movie})
    }

    render() {
        return (
            <div className="App">
                <h1>Movie Rater</h1>
                <div className="layout">
                    <MovieList movies={this.state.movies} movieClicked={this.movieClicked}/>
                    <MovieDetails movie={this.state.selectedMovie} updateMovie={this.movieClicked}/>
                </div>
            </div>
        );
    }
}

export default App;