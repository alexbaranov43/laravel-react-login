import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
// check if local strorage exists
let state_of_state = localStorage["appState"];
if (!state_of_state) {
    let appState = {
        isLoggedIn: false,
        user: {}
    };
    localStorage["appState"] = JSON.stringify(appState);
}
let state = localStorage["appState"];
let AppState = JSON.parse(state);
// confirm user auth
const Auth = {
    isLoggedIn: AppState.isLoggedIn,
    user: AppState
};
// redirects to login after route passed to private route
const PrivateRoute = ({ component: Component, path, ...rest }) => (
    <Route
        path={path}
        {...rest}
        render={props =>
            Auth.isLoggedIn ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: {
                            prevLocation: path,
                            error: "You need to login first!"
                        }
                    }}
                />
            )
        }
    />
);
export default withRouter(PrivateRoute);
