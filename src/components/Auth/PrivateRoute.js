import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const isAuthenticated = () => {
    return !!localStorage.getItem('userToken');
};

const PrivateRoute = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/auth/signin",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;