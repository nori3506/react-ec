import React, { useCallback } from "react";
import List from "@material-ui/core/List";
import { ListItem } from "@material-ui/core";
import { ListItemAvatar, ListItemText } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/styles";
import { PrimaryButton } from "../Uikit";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import Noimage from "../../assets/img/noimage.png";

const useStyles = makeStyles({
  list: {
    background: "#fff",
    height: "auto",
  },
  image: {
    objectFit: "cover",
    margin: "8px 16px 8px 0",
    height: 96,
    width: 96,
  },
  text: {
    width: "100%",
  },
});

const OrderdProducts = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const products = props.products;

  const goToProductDetail = useCallback((id) => {
    dispatch(push("/product/" + id));
  });

  return (
    <List>
      {products.map((product) => (
        <>
          <ListItem className={classes.list} key={product.id}>
            <ListItemAvatar>
              <img
                className={classes.image}
                src={product.images[0] ? product.images[0].path : Noimage}
                alt="product image"
              />
            </ListItemAvatar>
            <div className={classes.text}>
              <ListItemText
                primary={product.name}
                secondary={"Size:" + product.size}
              />
              <ListItemText primary={product.price + "CAD"} />
            </div>
            <PrimaryButton
              label={"Detail"}
              onClick={() => goToProductDetail(product.id)}
            />
          </ListItem>
          <Divider />
        </>
      ))}
    </List>
  );
};

export default OrderdProducts;
