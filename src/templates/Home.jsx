import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../reducks/users/operations";
import { getUserId, getUserName } from "../reducks/users/selectors";

export default function Home() {
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const username = getUserName(selector);
  const dispatch = useDispatch();

  return (
    <>
      <h2>HOME</h2>
      <p>{uid}</p>
      <p>{username}</p>
      <button onClick={() => dispatch(signOut())}>Sign Out</button>
    </>
  );
}
