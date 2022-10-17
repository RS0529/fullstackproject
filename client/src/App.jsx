
import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Toolbar from "./components/Toolbar/Toolbar";
import MainNavigation from "./components/Navigation/MainNavigation/MainNavigation";
import ErrorHandler from "./components/ErrorHandler/ErrorHandler";

import FeedPage from "./pages/Feed/Feed";
import SinglePostPage from "./pages/Feed/SinglePostPage/SinglePostPage";
import LoginPage from "./pages/Auth/Login";
import SignupPage from "./pages/Auth/Signup";

// import "./App.css";

class App extends Component {
  state = {
    isAuth: true,
    token: null,
    userId: null,
    authLoading: false,
    error: null,
  };

  componentDidCatch() {}

  logoutHandler = () => {};

  loginHandler = () => {};

  signupHandler = () => {};

  setAutoLogout = () => {};

  errorHandler = () => {};

  render() {
    let routes = (
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => (
            <LoginPage
              {...props}
              onLogin={this.loginHandler}
              loading={this.state.authLoading}
            />
          )}
        />
        <Route
          path="/signup"
          exact
          render={(props) => (
            <SignupPage
              {...props}
              onSignup={this.signupHandler}
              loading={this.state.authLoading}
            />
          )}
        />
        <Redirect to="/" />
      </Switch>
    );
        if (this.state.isAuth) {
          routes = (
            <Switch>
              <Route
                path="/"
                render={(props) => (
                  <FeedPage
                    userId={this.state.userId}
                    token={this.state.token}
                  />
                )}
              />
              <Route
                path="/:postId"
                render={(props) => (
                  <SinglePostPage
                    userId={this.state.userId}
                    token={this.state.token}
                  />
                )}
              />
              <Redirect to="/" />
            </Switch>
          );
        }

    return (
      <Fragment>
        <ErrorHandler error={this.state.error} onHandler={this.errorHandler} />
        <Layout
          header={
            <Toolbar>
              <MainNavigation
                onLogout={this.logoutHandler}
                isAuth={this.state.isAuth}
              />
            </Toolbar>
          }
        />
        {routes}
      </Fragment>
    );
  }
}

export default withRouter(App);