import React, {Component} from "react";
import {CtxConsumer} from "../index";

class Footer extends Component {

    state = {
        name: "",
        age: 0,
        isLogin: true,
    }

    componentDidMount() {
        this.setState({name: "My name"})
    }


    changed = (e) => {
        let request = e.target.value
        if (request === "a") {
            this.setState({name: "Crazy"})
        } else {
            this.setState({name: request})
        }
    }

    render() {
        return (
            <CtxConsumer>
                {
                    (context) => (
                        <div>
                            {
                                context.animals.map(animal => {
                                    return (
                                        <div key={animal}>
                                            <h1>{animal}</h1>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )}
            </CtxConsumer>
        )
    }
}

export default Footer;