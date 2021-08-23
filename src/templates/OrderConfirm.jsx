import React, { useCallback, useMemo } from "react";
import React, { useCallback, useMemo } from "react";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import { CartListItem } from "../components/Products";
import { getProductsInCart } from "../reducks/users/selectors";
import { List } from "@material-ui/core/List";
import { Divider } from "@material-ui/core/Divider";
import { PrimaryButton } from "../components/Uikit";

const OrderConfirm = () => {
  return <div></div>;
};

export default OrderConfirm;
