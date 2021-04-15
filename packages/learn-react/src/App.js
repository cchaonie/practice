import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import { Questionare, Home } from "./pages";
import configureStore from "./redux/store";

const store = configureStore();

export default () => {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/questionare">Questionare</Link>
                        </li>
                    </ul>
                    <hr />
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/questionare">
                            <Questionare />
                        </Route>
                        <Redirect to="/" />
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
};
