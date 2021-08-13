import React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { signInAction } from "../reducks/users/actions";

export default function Login() {
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Login</h2>
      <button
        onClick={() => {
          dispatch(signInAction({ uid: "0001", username: "nori" }));
          dispatch(push("/"));
        }}
      >
        Login
      </button>
    </div>
  );
}
