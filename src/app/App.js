import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import NavBar from "./components/ui/navBar";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/users/:userId?/:edit?" exact component={Users} />
                <Redirect to="/" />
            </Switch>
        </>
    );
}

export default App;
