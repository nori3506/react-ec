import { makeStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import { push } from "connected-react-router";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartListItem } from "../components/Products";
import { GreyButton, PrimaryButton } from "../components/Uikit";
import { getProductsInCart } from "../reducks/users/selectors";

const useStyles = makeStyles({
  root: {
    margin: "0 auto",
    maxWidth: 512,
    width: "100%",
  },
});

const CartList = () => {
  const selector = useSelector((state) => state);
  const productsInCart = getProductsInCart(selector);
  const dispatch = useDispatch();
  const classes = useStyles();

  const goToOrder = useCallback(() => {
    dispatch(push("/order/confirm"));
  }, []);

  const backToHome = useCallback(() => {
    dispatch(push("/"));
  }, []);

  return (
    <section className="c-section-wrapin">
      <h2>Cart</h2>
      <List className={classes.root}>
        {productsInCart.length > 0 &&
          productsInCart.map((product) => (
            <CartListItem key={product.cartId} product={product} />
          ))}
      </List>
      <div className="module-spacer--medium" />
      <div className="p-grid__column">
        <PrimaryButton label={"Payment"} onClick={goToOrder} />
        <div className="module-spacer--extra-extra-small" />
        <GreyButton label={"Other Items?"} onClick={backToHome} />
      </div>
    </section>
  );
};

export default CartList;
