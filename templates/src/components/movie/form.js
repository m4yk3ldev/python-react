import React, {Component} from 'react';

class MovieForm extends Component {
    state = {
        editedMovie: this.props.movie
    }
    inputChanged = event => {
        let movie = this.state.editedMovie;
        movie[event.target.name] = event.target.value;
        console.log(movie)
        this.setState({editedMovie: movie});
    }

    cancelClicked = () => {
        this.props.cancelForm();
    }
    saveClicked = () => {
        console.log(this.state.editedMovie)
        fetch(process.env.REACT_APP_API_URL + "/api/movies/", {
            method: 'POST',
            headers: {
                "Authorization": "Token 06ec4b621d5c3a32730c87ecd69fbf20e36c5b9c",
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(this.state.editedMovie)
        }).then(resp => resp.json()).then(res => this.props.newMovie(res))
            .catch(error => console.log(error))
    }
    updateClicked = () => {
        console.log(this.state.editedMovie)
        fetch(process.env.REACT_APP_API_URL + "/api/movies/" + this.state.editedMovie.id + "/", {
            method: 'PUT',
            headers: {
                "Authorization": "Token 06ec4b621d5c3a32730c87ecd69fbf20e36c5b9c",
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(this.state.editedMovie)
        }).then(resp => resp.json()).then(res => this.props.editedMovie(res))
            .catch(error => console.log(error))
    }

    render() {
        const mov = this.props.movie
        console.log(mov)
        return (
            <React.Fragment>
                <span>Title</span><br/>
                <input name="title" type="text" value={mov.title} onChange={this.inputChanged}/>
                <br/>
                <span>Description</span><br/>
                <textarea name="description" value={mov.description} onChange={this.inputChanged}/>
                <br/>
                <button onClick={mov.id ? this.updateClicked : this.saveClicked}>Save</button>
                <button onClick={this.cancelClicked}>Cancel</button>

            </React.Fragment>
        )

    }

}


export default MovieForm;