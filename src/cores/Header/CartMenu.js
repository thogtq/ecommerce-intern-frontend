import { Grid, makeStyles, Menu, MenuItem } from "@material-ui/core";
import { CartContext } from "contexts/context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import CartMenuItem from "./CartMenuItem";

const styles = makeStyles({
  root: {
    marginTop: "20px",
    width: "270px",
  },
  list: {
    backgroundColor: "#fbfbfb",
  },
  listItem: {
    maxHeight: "80px",
  },
  viewCart: {
    padding: "20px 0",
    color: "#ffa15f",
    fontFamily: "Montserrat-Bold",
    fontSize: "14px",
    lineHeight: "22px",
  },
});
export default function CartMenu({anchorEl, setAnchorEl }) {
  const [cart] = useContext(CartContext);
  const classes = styles();
  const handleClose = (e) => {
    setAnchorEl(null);
  };
  return (
    <Menu
      classes={{ paper: classes.root, list: classes.list }}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      disableAutoFocusItem={true}
      //MenuListProps={{ onMouseLeave: handleClose }}
    >
      {cart.length ? (
        cart.map((cartItem) => [
          <CartMenuItem key={cartItem.id} cartItem={cartItem} />,
          <hr className="line"></hr>,
        ])
      ) : (
        <MenuItem>
          <Grid container justify="center">
            <span>Empty</span>
          </Grid>
        </MenuItem>
      )}
      <Link to="/cart">
        <MenuItem classes={{ root: classes.viewCart }}>
          <Grid container justify="center" alignItems="center">
            View cart
          </Grid>
        </MenuItem>
      </Link>
    </Menu>
  );
}
