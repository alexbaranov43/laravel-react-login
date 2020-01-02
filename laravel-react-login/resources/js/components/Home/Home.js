import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
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
            <div className="offset-xl-3 col-xl-6 offset-lg-1 col-lg-10 col-md-12 col-sm-12 col-12 ">
                <span>
                    Home
                    <br />
                    <Link to="/login" className="text-yellow">
                        <button className="btn btn-info button-width">
                            Login
                                </button>
                    </Link>
                </span>
                <div>
                    <p className="text-yellow">
                        Don't have an account?{" "} <br />
                        <Link to="/register" className="text-yellow">
                            {" "}
                            <button className="btn btn-primary m-r-md">
                                Register
                                </button>
                        </Link>
                    </p>
                </div>
            </div>
        );
    }
}
export default Home;
