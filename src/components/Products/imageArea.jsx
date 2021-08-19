import { IconButton } from "@material-ui/core";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles({
  icon: {
    height: 48,
    width: 48,
  },
});

const ImageArea = () => {
  const classes = useStyles();

  return (
    <div className="">
      <div className="u-text-right">
        <span>Product Image</span>
        <IconButton className={classes.icon}>
          <label htmlFor="">
            <AddPhotoAlternateIcon />
            <input className="u-display-none" type="file" id="image" />
          </label>
        </IconButton>
      </div>
    </div>
  );
};

export default ImageArea;
