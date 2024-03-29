import { Grid, TableCell, TableRow, withStyles } from "@material-ui/core";
import ColorPicker from "components/ColorPicker";
import ConfirmBox from "components/ConfirmBox";
import QuantityPicker from "components/QuantityPicker";
import React, { useState, useEffect } from "react";
import {getProduct} from "../../services/ProductService";

export default function CartItem({
  cartItem,
  onRemove,
  total,
  setTotal,
  onChange,
}) {
  const [amount, setAmount] = useState(0);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const handleRemove = () => {
    setTotal((total) => total - amount);
    onRemove(cartItem);
  };
  const StyledTableCell = withStyles({
    root: {
      padding: "16px 0",
      minWidth: "100px",
    },
  })(TableCell);
  useEffect(() => {
    if (!loading) {
      let _amount = product.price * cartItem.quantity;
      setAmount(_amount);
      setTotal(total + _amount);
    }
  }, [loading]);
  useEffect(() => {
    const fetchProduct = async () => {
      let res = await getProduct(cartItem.productID);
      if (res.status === "success") {
        setProduct(res.data.product);
        setLoading(false);
      } else {
        console.log(res.error.message);
      }
    };
    fetchProduct();
  }, [cartItem]);
  const handleQuantity = (value) => {
    if (onChange) {
      onChange(cartItem.id, value);
      let newAmount = product.price * (value - cartItem.quantity);
      setAmount((amount) => amount + newAmount);
      setTotal((total) => total + newAmount);
    }
  };
  return (
    !loading && (
      <TableRow>
        <StyledTableCell
          align="left"
          className="th-product"
          component="th"
          scope="row"
        >
          <Grid container direction="row">
            <Grid item lg={5}>
              <img
                className="product-image"
                src={product.images[0]}
                alt="product-img"
              />
            </Grid>
            <Grid item xs container direction="column" justify="space-between">
              <Grid className="product-name" item>
                {product.name}
              </Grid>
              <Grid item className="action-menu">
                <span>Change</span> |{" "}
                <span
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Remove
                </span>
                <ConfirmBox
                  openConfirm={open}
                  setOpenConfirm={setOpen}
                  onConfirm={handleRemove}
                  content="Do you want to remove this product from cart"
                />
              </Grid>
            </Grid>
          </Grid>
        </StyledTableCell>
        <StyledTableCell align="center">
          <ColorPicker color={cartItem.color} />
        </StyledTableCell>
        <StyledTableCell align="center">{cartItem.size}</StyledTableCell>
        <StyledTableCell align="center">
          <QuantityPicker value={cartItem.quantity} onChange={handleQuantity} />
        </StyledTableCell>
        <StyledTableCell align="center">${amount}.00</StyledTableCell>
      </TableRow>
    )
  );
}
