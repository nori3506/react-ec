import React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { signInAction } from "../reducks/users/actions";
import { signIn } from "../reducks/users/operations";

export default function Login() {
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Login</h2>
      <button
        onClick={() => {
          dispatch(signIn());
        }}
      >
        Login
      </button>
    </div>
  );
}
