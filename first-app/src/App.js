import React from "react";
import './App.css';
import Header from "./components/header";
import Footer from "./components/footer";



function createAlert() {
    alert("Hello, You clicked me")
}

function App() {
    return (
        <React.Fragment>
            <div className="App">
                <Header info="this is my message"/>
                <p>main content</p>
                <Footer trademark="page by Maykel" myalert={createAlert}/>
            </div>
        </React.Fragment>
    );
}

export default App;