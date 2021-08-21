import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles({
  iconCell: {
    padding: 0,
    height: 48,
    width: 48,
  },
});

const SizeTable = (props) => {
  const classes = useStyles();
  const sizes = props.sizes;

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {sizes.length > 0 &&
            sizes.map((size) => (
              <TableRow key={size.size}>
                <TableCell component="th" scope="row">
                  {size.size}
                </TableCell>
                <TableCell>残り{size.amount}</TableCell>
                <TableCell className={classes.iconCell}>
                  {size.amount > 0 ? (
                    <IconButton onClisk={() => props.addProduct(size.size)}>
                      <ShoppingCartIcon />
                    </IconButton>
                  ) : (
                    <div className="">SOLD OUT</div>
                  )}
                </TableCell>
                <TableCell className={classes.iconCell}>
                  <IconButton>
                    <FavoriteBorderIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SizeTable;
