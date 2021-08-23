import { ListItemAvatar, ListItemText } from "@material-ui/core";
import { Divider, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { useSelector } from "react-redux";
import { getUserId } from "../../reducks/users/selectors";
import { db } from "../../firebase";

const useStyles = makeStyles({
  list: {
    height: 128,
  },
  image: {
    objectFit: "cover",
    margin: 16,
    height: 96,
    width: 96,
  },
  text: {
    width: "100%",
  },
});

const CartListItem = (props) => {
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const image = props.product.images[0].path;
  const price = props.product.price.toLocaleString();
  const name = props.product.name;
  const uid = getUserId(selector);

  const removeProductFromCart = (id) => {
    return db.collection("users").doc(uid).collection("cart").doc(id).delete();
  };

  return (
    <>
      <ListItem className={classes.list}>
        <ListItemAvatar>
          <img className={classes.image} src={image} alt="Product Image" />
        </ListItemAvatar>
        <div className={classes.text}>
          <ListItemText
            primary={name}
            secondary={"Size:" + props.product.size}
          ></ListItemText>
          <ListItemText primary={price + "CAD"}></ListItemText>
        </div>
        <IconButton onClick={() => removeProductFromCart(props.product.cartId)}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
      <Divider />
    </>
  );
};

export default CartListItem;
