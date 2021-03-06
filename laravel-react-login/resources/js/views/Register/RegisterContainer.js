import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import FlashMessage from "react-flash-message";
class RegisterContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegistered: false,
            error: "",
            errorMessage: "",
            formSubmitting: false,
            user: {
                first_name: "",
                last_name: "",
                username: "",
                email: "",
                password: "",
                password_confirmation: ""
            },
            redirect: props.redirect
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handlePasswordConfirm = this.handlePasswordConfirm.bind(this);
    }
    // Redirect when registered
    componentDidMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState });
        }
        if (this.state.isRegistered) {
            return this.props.history.push("/dashboard");
        }
        const { prevLocation } = this.state.redirect.state || {
            prevLocation: { pathname: "/dashboard" }
        };
        if (prevLocation && this.state.isLoggedIn) {
            return this.props.history.push(prevLocation);
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ formSubmitting: true });
        ReactDOM.findDOMNode(this).scrollIntoView();
        let userData = this.state.user;
        axios
            .post("/api/auth/signup", userData)
            .then(response => {
                return response;
            })
            .then(json => {
                if (json.data.status === 201) {
                    let userData = {
                        id: json.data.id,
                        first_name: json.data.first_name,
                        last_name: json.data.last_name,
                        username: json.data.username,
                        email: json.data.email,
                        activation_token: json.data.activation_token
                    };
                    let appState = {
                        isRegistered: true,
                        user: userData
                    };
                    localStorage["appState"] = JSON.stringify(appState);
                    this.setState({
                        isRegistered: appState.isRegistered,
                        user: appState.user
                    });
                }
                this.props.history.push('/login')
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code that falls out of the range of 2xx
                    let err = error.response.data;
                    this.setState({
                        error: err.message,
                        errorMessage: err.errors,
                        formSubmitting: false
                    });
                } else if (error.request) {
                    // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
                    let err = error.request;
                    this.setState({
                        error: err,
                        formSubmitting: false
                    });
                } else {
                    // Something happened in setting up the request that triggered an Error
                    let err = error.message;
                    this.setState({
                        error: err,
                        formSubmitting: false
                    });
                }
            })
            .finally(this.setState({ error: "" }));
    }
    handleFirstName(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                first_name: value
            }
        }));
    }
    handleLastName(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                last_name: value
            }
        }));
    }
    handleUsername(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                username: value
            }
        }));
    }

    handleEmail(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                email: value
            }
        }));
    }
    handlePassword(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                password: value
            }
        }));
    }
    handlePasswordConfirm(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                password_confirmation: value
            }
        }));
    }
    render() {
        let errorMessage = this.state.errorMessage;
        let arr = [];
        Object.values(errorMessage).forEach(value => arr.push(value));
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-xl-3 col-xl-6 offset-lg-1 col-lg-10 col-md-12 col-sm-12 col-12 ">
                        <h2>Create Your Account</h2>
                        {this.state.isRegistered ? (
                            <FlashMessage
                                duration={60000}
                                persistOnHover={true}
                            >
                                <h5 className={"alert alert-success"}>
                                    Registration successful, redirecting...
                                </h5>
                            </FlashMessage>
                        ) : (
                            ""
                        )}
                        {this.state.error ? (
                            <FlashMessage
                                duration={900000}
                                persistOnHover={true}
                            >
                                <h5 className={"alert alert-danger"}>
                                    Error: {this.state.error}
                                </h5>
                                <ul>
                                    {arr.map((item, i) => (
                                        <li key={i}>
                                            <h5 style={{ color: "red" }}>
                                                {item}
                                            </h5>
                                        </li>
                                    ))}
                                </ul>
                            </FlashMessage>
                        ) : (
                            ""
                        )}
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input
                                    id="first_name"
                                    type="text"
                                    placeholder="First Name"
                                    className="form-control"
                                    required
                                    onChange={this.handleFirstName}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    id="last_name"
                                    type="text"
                                    placeholder="Last Name"
                                    className="form-control"
                                    required
                                    onChange={this.handleLastName}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    id="username"
                                    type="text"
                                    placeholder="Username"
                                    className="form-control"
                                    required
                                    onChange={this.handleUsername}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="E-mail"
                                    className="form-control"
                                    required
                                    onChange={this.handleEmail}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="form-control"
                                    required
                                    onChange={this.handlePassword}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    id="password_confirm"
                                    type="password"
                                    name="password_confirm"
                                    placeholder="Confirm Password"
                                    className="form-control"
                                    required
                                    onChange={this.handlePasswordConfirm}
                                />
                            </div>
                            <button
                                type="submit"
                                name="singlebutton"
                                className="btn btn-info btn-lg  btn-block mb10"
                                disabled={
                                    this.state.formSubmitting ? "disabled" : ""
                                }
                            >
                                Create Account
                            </button>
                        </form>
                        <br />
                        <div>
                            <p className="">
                                Already have an account?
                            </p>
                                <Link to="/login" className="">
                                    <button className="btn btn-success button-width m-r-md">
                                    {" "}
                                        Log In
                                    </button>
                                </Link>
                                <span className="pull-right">
                                    <Link to="/" className="">
                                        <button className="btn btn-danger button-width">
                                            Back
                                        </button>
                                    </Link>
                                </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(RegisterContainer);
