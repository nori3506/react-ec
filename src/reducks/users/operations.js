import { signInAction } from "./actions";
import { push } from "connected-react-router";

export const signIn = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const isSignedIn = state.users.isSignedIn;

    if (!isSignedIn) {
      const url = "https://api.github.com/users/nori3506";
      const res = await fetch(url)
        .then((res) => res.json())
        .catch(() => null);
      const username = res.login;

      dispatch(
        signInAction({
          isSignedIn: true,
          uid: "1",
          username: username,
        })
      );
      dispatch(push("/"));
    }
  };
};
