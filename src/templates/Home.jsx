import { useSelector } from "react-redux";
import { getUserId, getUserName } from "../reducks/users/selectors";

export default function Home() {
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const username = getUserName(selector);

  return (
    <>
      <h2>HOME</h2>
      <p>{uid}</p>
      <p>{username}</p>
    </>
  );
}
