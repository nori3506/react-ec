import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useState, useCallback, useMemo } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/styles";
import { TextInput } from "../Uikit";

const useStyles = makeStyles({
  iconCell: {
    height: 48,
    width: 48,
  },
  checkIcon: {
    float: "right",
  },
});

const SetSizeArea = (props) => {
  const [index, setIndex] = useState(0);
  const [size, setSize] = useState("");
  const [amount, setAmount] = useState(0);
  const classes = useStyles();

  const inputSize = useCallback(
    (event) => {
      setSize(event.target.value);
    },
    [setSize]
  );

  const inputAmount = useCallback(
    (event) => {
      setAmount(event.target.value);
    },
    [setAmount]
  );

  const addSize = (indes, size, amount) => {
    if (size === "" || amount === "") {
      return false;
    } else {
      if (index === props.sizes.length) {
        props.setSizes((prevState) => [
          ...prevState,
          { size: size, amount: amount },
        ]);
        setIndex(index + 1);
        setSize("");
        setAmount(0);
      } else {
        const newSizes = props.sizes;
        newSizes[index] = { size: size, amount: amount };
        props.setSizes(newSizes);
        setIndex(newSizes.length);
        setSize("");
        setAmount(0);
      }
    }
  };

  const editSize = (index, size, amount) => {
    setIndex(index);
    setSize(size);
    setAmount(amount);
  };

  const deleteSize = (deleteIndex) => {
    const newSizes = props.sizes.filter((item, i) => i !== deleteIndex);
    props.setSizes(newSizes);
  };

  const memoIndex = useMemo(() => {
    setIndex(props.sizes.length);
  }, [props.sizes.length]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Size</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell className={classes.iconCell} />
              <TableCell className={classes.iconCell} />
            </TableRow>
          </TableHead>
          <TableBody>
            {props.sizes.length > 0 &&
              props.sizes.map((item, i) => (
                <TableRow key={item.size}>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>
                    <IconButton
                      className={classes.iconCell}
                      onClick={() => editSize(i, item.size, item.amount)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      className={classes.iconCell}
                      onClick={() => deleteSize(i)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div className="">
          <TextInput
            fullWidth={false}
            label={"Size"}
            multiline={false}
            required={true}
            onChange={inputSize}
            row={1}
            value={size}
            type={"text"}
          />
          <TextInput
            fullWidth={false}
            label={"Amount"}
            multiline={false}
            required={true}
            onChange={inputAmount}
            row={1}
            value={amount}
            type={"number"}
          />
        </div>
        <IconButton
          className={classes.checkIcon}
          onClick={() => addSize(index, size, amount)}
        >
          <CheckCircleIcon />
        </IconButton>
      </TableContainer>
    </div>
  );
};

export default SetSizeArea;
