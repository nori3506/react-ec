import Divider from "@material-ui/core/Divider";
import React from "react";
import { TextDetails } from "../Uikit";
import OrderdProducts from "./OrderdProducts";

const datetimeToString = (date) => {
  return (
    date.getFullYear() +
    "-" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("00" + date.getDate()).slice(-2) +
    " " +
    ("00" + date.getHours()).slice(-2) +
    " " +
    ("00" + date.getMinutes()).slice(-2) +
    " " +
    ("00" + date.getSeconds()).slice(-2)
  );
};

const dateToString = (date) => {
  return (
    date.getFullYear() +
    "-" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("00" + date.getDate()).slice(-2)
  );
};

const OrderHistoryItem = (props) => {
  const order = props.order;
  const price = order.amount.toLocaleString() + "CAD";
  const orderedDatetime = datetimeToString(order.updated_at.toDate());
  const shippingDate = dateToString(order.shipping_date.toDate());
  return (
    <div>
      <div className="module-spacer--small" />
      <TextDetails label={"ORDER ID"} value={order.id} />
      <TextDetails label={"ORDER DATE"} value={orderedDatetime} />
      <TextDetails label={"SHIPPING DATE"} value={shippingDate} />
      <TextDetails label={"TOTAL PRICE"} value={price} />
      {order.products.length > 0 && (
        <OrderdProducts products={order.products} />
      )}
      <div className="module-spacer-extra-extra-small" />
      <Divider />
    </div>
  );
};

export default OrderHistoryItem;
