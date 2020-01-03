import React, { Component } from "react";
class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            user: {},
            formSubmitting: false
        };
        this.logOut = this.logOut.bind(this);
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
    // clear local storage on logout
    logOut() {
        let appState = {
            isLoggedIn: false,
            user: {}
        };
        localStorage["appState"] = JSON.stringify(appState);
        this.setState(appState);
        this.props.history.push('/login');
    }    

    render() {
        return (
            <div>
                <h1>Hello Future Employer</h1>
                <br />
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th scope="row ">
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
                <form onSubmit={this.logOut}>
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
