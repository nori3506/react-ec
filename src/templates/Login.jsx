import React from 'react'
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";


export default function Login() {
  const dispatch = useDispatch()
  return (
    <div>
      <h2>Login</h2>
      <button onClick={() => dispatch(push('/'))}>
        Login
      </button>
    </div>
  )
}
