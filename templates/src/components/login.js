import React, {Component} from 'react';

class Login extends Component {
    state = {
        credentials: {
            username: '',
            password: '',
        }

    }
    inputChanged = event => {
        let cred = this.state.credentials;
        cred[event.target.name] = event.target.value;
        this.setState({credentials: cred});
    }

    login = event => {
        console.log(this.state.credentials)
        fetch(process.env.REACT_APP_API_URL + "/auth/", {
            method: 'POST',
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify(this.state.credentials)
        }).then(resp => resp.json()).then(res => {
            console.log(res.token);
            if (res.token) {
                window.location.href = "/movies"
            }
        })
            .catch(error => console.log(error))
    }

    render() {
        const isDisable = this.state.credentials.username.length === 0 ||
            this.state.credentials.password.length === 0
        return (
            <div className="login-container">
                <h1>Login</h1>
                <span>Usuario:</span><br/>
                <input type="text" name="username" value={this.state.credentials.username}
                       onChange={this.inputChanged}/><br/>
                <span>Password:</span>
                <input type="password" name="password" value={this.state.credentials.password}
                       onChange={this.inputChanged}/><br/>
                <button disabled={isDisable} onClick={this.login}>Login</button>
            </div>
        )
    }

}

export default Login;