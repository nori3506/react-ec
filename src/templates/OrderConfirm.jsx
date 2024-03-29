import React, { useCallback, useMemo } from "react";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import { CartListItem } from "../components/Products";
import { getProductsInCart } from "../reducks/users/selectors";
import List from "@material-ui/core/List";
import { Divider } from "@material-ui/core";
import { PrimaryButton, TextDetails } from "../components/Uikit";
import { orderProduct } from "../reducks/products/operations";

const useStyles = makeStyles((theme) => ({
  detailBox: {
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      width: 320,
    },
    [theme.breakpoints.up("sm")]: { width: 512 },
  },
  orderBox: {
    border: "1px solid rgba(0,0,0,0.2)",
    borderRadius: 4,
    boxShadow: "0 4px 2px 2px rgba(0,0,0,0.2)",
    height: 256,
    margin: "24px auto 16px auto",
    padding: 16,
    width: 286,
  },
}));

const OrderConfirm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const productsInCart = getProductsInCart(selector);

  const subtotal = useMemo(() => {
    return productsInCart.reduce((sum, product) => (sum += product.price), 0);
  }, [productsInCart]);

  const shippingFee = subtotal >= 100 ? 0 : 10;

  const tax = subtotal * 0.13;

  const total = subtotal + shippingFee + tax;

  const order = useCallback(() => {
    dispatch(orderProduct(productsInCart, total));
  }, [productsInCart, total]);

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">Order Confirmation</h2>
      <div className="p-grid__row">
        <div className={classes.detailBox}>
          <List>
            {productsInCart.length > 0 &&
              productsInCart.map((product) => (
                <CartListItem product={product} key={product.cartId} />
              ))}
          </List>
        </div>
        <div className={classes.orderBox}>
          <TextDetails
            label={"Subtotal"}
            value={subtotal.toLocaleString() + " CAD"}
          />
          <TextDetails label={"Tax"} value={tax + " CAD"} />
          <TextDetails label={"Shipping Fee"} value={shippingFee + " CAD"} />
          <Divider />
          <TextDetails label={"Total"} value={total + " CAD"} />
          <PrimaryButton label={"Order"} onClick={order} />
        </div>
      </div>
    </section>
  );
};

export default OrderConfirm;
