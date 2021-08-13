import React from "react";
import { useSelector } from "react-redux";
import { getUserId } from "../reducks/users/selectors";

export default function Home() {
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);

  return (
    <>
      <h2>HOME</h2>
      <p>{uid}</p>
    </>
  );
}
