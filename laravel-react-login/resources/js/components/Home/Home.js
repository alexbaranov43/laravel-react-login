import React, { Component } from "react";
import Header from "../Header/Header";
class Home extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            user: {}
        };
    }
    // check if user is authenticated and storing authentication data as states if true
    componentDidMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({
                isLoggedIn: AppState.isLoggedIn,
                user: AppState.user
            });
        }
    }
    render() {
        return (
            <div>
                <Header
                    userData={this.state.user}
                    userIsLoggedIn={this.state.isLoggedIn}
                />
                <span>
                    Home
                </span>
            </div>
        );
    }
}
export default Home;
