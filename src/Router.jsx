import React from "react";
import { Route, Switch } from "react-router";
import { Login, Home, Signup } from "./templates";
import SignUp from "./templates/SignUp";

export default function Router() {
  return (
    <Switch>
      <Route exact path={"/login"} component={Login} />
      <Route exact path={"(/)?"} component={Home} />
      <Route exact path={"/signup"} component={SignUp} />
    </Switch>
  );
}
