import React, {Component} from "react";


class Header extends Component {
    render() {
        return (
            <React.Fragment>
                <h1>{this.props.info}</h1>
            </React.Fragment>
        )

    }
}


export default Header;