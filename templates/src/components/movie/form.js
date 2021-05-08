import React, {Component} from 'react';

class MovieForm extends Component {
    state = {
        editedMovie: this.props.movie
    }
    inputChanged = event => {
        let movie = this.state.editedMovie;
        movie[event.target.name] = event.target.value;
        this.setState({editedMovie: movie});
    }

    cancelClicked = () => {
        this.props.cancelForm();
    }
    saveClicked = () => {
        fetch(process.env.REACT_APP_API_URL + "/api/movies/", {
            method: 'POST',
            headers: {
                "Authorization": "Token ba8e52d0d1878e1702d7d90e0cb6f41ae5745870",
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(this.state.editedMovie)
        }).then(resp => resp.json()).then(res => {
            this.props.newMovie(res);
            this.props.movie.title = ''
            this.props.movie.description = ''

        })
            .catch(error => console.log(error))
    }
    updateClicked = () => {
        fetch(process.env.REACT_APP_API_URL + "/api/movies/" + this.state.editedMovie.id + "/", {
            method: 'PUT',
            headers: {
                "Authorization": "Token ba8e52d0d1878e1702d7d90e0cb6f41ae5745870",
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(this.state.editedMovie)
        }).then(resp => resp.json()).then(res => this.props.editedMovie(res))
            .catch(error => console.log(error))
    }

    render() {
        const mov = this.props.movie
        const isDisable = this.state.editedMovie.title.length === 0 ||
            this.state.editedMovie.description.length === 0
        return (
            <React.Fragment>
                <span>Title</span><br/>
                <input name="title" type="text" value={mov.title} onChange={this.inputChanged}/>
                <br/>
                <span>Description</span><br/>
                <textarea name="description" value={mov.description} onChange={this.inputChanged}/>
                <br/>
                <button disabled={isDisable} onClick={mov.id ? this.updateClicked : this.saveClicked}>Save</button>
                <button onClick={this.cancelClicked}>Cancel</button>

            </React.Fragment>
        )

    }

}


export default MovieForm;