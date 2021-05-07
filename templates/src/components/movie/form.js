import React, {Component} from 'react';

class MovieForm extends Component {
    state = {
        editedMovie: this.props.movie
    }
    inputChanged = () => {
        console.log('changed')
    }

    cancelClicked = () => {
        this.props.cancelForm();
    }
    saveClicked = () => {
        console.log('save')
    }

    render() {
        const mov = this.props.movie
        console.log()
        return (
            <React.Fragment>
                {mov.title !== "" ? (
                    <React.Fragment>
                        <span>Title</span><br/>
                        <input type="text" value={mov.title} onChange={this.inputChanged}/>
                        <br/>
                        <span>Description</span><br/>
                        <textarea type="text" value={mov.description} onChange={this.inputChanged}/>
                        <br/>
                        <button>Update</button>
                        <button onClick={this.cancelClicked}>Cancel</button>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <span>Title</span><br/>
                        <input type="text" value="" onChange={this.inputChanged}/><br/>
                        <span>Description</span><br/>
                        <textarea type="text" value="" onChange={this.inputChanged}/><br/>
                        <button onClick={this.saveClicked}>Save</button>
                        <button onClick={this.cancelClicked}>Cancel</button>
                    </React.Fragment>
                )}

            </React.Fragment>
        )
    }

}


export default MovieForm;