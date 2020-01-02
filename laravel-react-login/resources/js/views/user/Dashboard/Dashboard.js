import React, { Component } from "react";
class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            user: {},
            formSubmitting: false
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
    handleSubmit(e) {
        // e.preventDefault();
        localStorage.clear();
        // this.setState({ formSubmitting: true });
        // let userData = this.state.user;
        // axios
        //     .post("/api/auth/logout", userData)
        //     .then(response => {
        //         localStorage.clear()
        //         return response;
        //     })
        //     .then(json => {
        //         if (json.data.success) {
        //             let userData = {
        //                 id: null,
        //                 first_name: null,
        //                 last_name: null,
        //                 username: null,
        //                 email: null,
        //                 access_token: null
        //             };
        //             let appState = {
        //                 isLoggedIn: true,
        //                 user: userData
        //             };
        //             localStorage["appState"] = JSON.stringify(appState);
        //             this.setState({
        //                 isLoggedIn: false,
        //                 user: null,
        //                 error: ""
        //             });
        //             location.reload();
        //         } 
        //     })
        //     .catch(error => {
        //         if (error.response) {
        //             // The request was made and the server responded with a status code that falls out of the range of 2xx
        //             let err = error.response.data;
        //             this.setState({
        //                 error: err.message,
        //                 errorMessage: err.errors,
        //                 formSubmitting: false
        //             });
        //         } else if (error.request) {
        //             // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
        //             let err = error.request;
        //             this.setState({
        //                 error: err,
        //                 formSubmitting: false
        //             });
        //         } else {
        //             // Something happened in setting up the request that triggered an Error
        //             let err = error.message;
        //             this.setState({
        //                 error: err,
        //                 formSubmitting: false
        //             });
        //         }
        //     })
        //     .finally(
        //         this.setState({ error: "" })
        //     );
    }
    // 4.1
    render() {
        return (
            <div>
                <span>User Info</span>
                <br />
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th scope="row " onClick={console.log(this.state)}>
                                First Name
                            </th>
                            <td>{this.state.user.first_name}</td>
                        </tr>
                        <tr>
                            <th scope="row ">Last Name</th>
                            <td>{this.state.user.last_name}</td>
                        </tr>
                        <tr>
                            <th scope="row ">Username</th>
                            <td>{this.state.user.username}</td>
                        </tr>
                        <tr>
                            <th scope="row ">Email</th>
                            <td>{this.state.user.email}</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <div>
                <form onSubmit={this.handleSubmit}>
                    <button type="submit"
                        name="singlebutton"
                        className="btn btn-danger"
                    >Logout</button>
                    </form>
                    </div>
            </div>
        );
    }
}
export default Dashboard;
