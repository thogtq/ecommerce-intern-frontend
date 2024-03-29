import AdminMenu from "pages/AdminPage/AdminMenu";
import ProductFeatureBar from "./ProductFeatureBar";
import dropdownIcon from "assets/images/admin/icons/dropdown.svg";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Grid,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Paper,
  MenuItem,
  ListItemIcon,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import React, { useState, useEffect, useRef } from "react";
import { getProducts, deleteProduct } from "../../services/ProductService";
import DropdownMenu from "components/DropdownMenu";
import { Link } from "react-router-dom";
import ConfirmBox from "components/ConfirmBox";
import { getFormatedDateString } from "../../helpers/date";

const Header = () => {
  return (
    <Grid className="admin-header" container justify="space-between">
      <Grid className="admin-header-title" item>
        Products
      </Grid>
      <AdminMenu />
    </Grid>
  );
};
const ProductContentTable = ({ filter, setFilter }) => {
  const [products, setProducts] = useState([]);
  const [counts, setCounts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    //Fix me
    //Unounted
    const fetchProduct = async () => {
      let res = await getProducts(filter);
      if (res.status === "success") {
        setProducts(res.data.products);
        setTotalPages(res.data.pages);
        setCounts(res.data.counts);
      } else {
        alert(res.error.message);
      }
    };
    fetchProduct();
  }, [filter]);
  const handlePagination = (e) => {
    setFilter({ ...filter, page: parseInt(e.target.textContent) });
  };
  const ActionMenu = (props) => {
    const anchorRef = useRef(null);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const handleToggle = (e) => {
      setOpenMenu((prevOpen) => !prevOpen);
    };
    //Handle remove product
    const handleRemove = async () => {
      let res = await deleteProduct(props.productID);
      if (res.status === "success") {
        setProducts(
          products.filter((product) => product.productID !== props.productID)
        );
      } else {
        console.log(res);
        //alert(res.error.message);
      }
      setOpenMenu(false);
    };
    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
      setOpenMenu(false);
    };
    return (
      <React.Fragment>
        <span
          ref={anchorRef}
          aria-controls={openMenu ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Actions
          <img src={dropdownIcon} alt="dropdown-icon"></img>
        </span>
        <DropdownMenu
          open={openMenu}
          setOpen={setOpenMenu}
          anchorRef={anchorRef}
          handleClose={handleClose}
        >
          <Link
            to={"/admin/products/edit-product/?productID=" + props.productID}
          >
            <MenuItem className="table-cell-text" onClick={handleClose}>
              <ListItemIcon>
                <CreateIcon color="disabled" />
              </ListItemIcon>
              Edit
            </MenuItem>
          </Link>
          <MenuItem
            className="table-cell-text"
            onClick={(e) => {
              setOpenConfirm(true);
            }}
          >
            <ListItemIcon>
              <DeleteIcon color="disabled" />
            </ListItemIcon>
            Remove
          </MenuItem>
          <ConfirmBox
            openConfirm={openConfirm}
            setOpenConfirm={setOpenConfirm}
            onConfirm={handleRemove}
            content={"Do you want to remove `" + props.name + "` ?"}
          />
        </DropdownMenu>
      </React.Fragment>
    );
  };
  return (
    <Grid className="admin-content-table">
      <TableContainer component={Paper}>
        <Table className="admin-table" aria-label="simple table">
          <TableHead className="table-header">
            <TableRow>
              <TableCell align="left">PRODUCTS</TableCell>
              <TableCell align="left">SOLD</TableCell>
              <TableCell align="left">DATE ADDED </TableCell>
              <TableCell align="left">PROFIT($)</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="table-body">
            {products.map((product) => {
              let createDate = new Date(product.createdAt);
              let productImage = product.images[0];
              return (
                <TableRow key={product.productID}>
                  <TableCell
                    align="left"
                    className="th-product"
                    component="th"
                    scope="row"
                    width="440px"
                  >
                    <Grid container direction="row">
                      <Grid item xs={1}>
                        <img src={productImage} alt="product-img" />
                      </Grid>
                      <Grid item xs>
                        <Grid
                          className="th-product-name"
                          container
                          direction="column"
                        >
                          <Grid item>
                            <Link
                              to={"/product/?productID=" + product.productID}
                              target="_blank"
                            >
                              {product.name}
                            </Link>
                          </Grid>
                          <Grid item>{product.categories.join(", ")}</Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell
                    className="table-cell-text"
                    align="left"
                    width="130px"
                  >
                    {product.sold + "/" + product.quantity}
                  </TableCell>
                  <TableCell className="table-cell-text" align="left">
                    {getFormatedDateString(createDate)}
                  </TableCell>
                  <TableCell className="table-cell-text" align="left">
                    {product.profit}
                  </TableCell>
                  <TableCell className="td-action" align="right" width="120px">
                    <ActionMenu
                      productID={product.productID}
                      name={product.name}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="table-footer">
        <span>Show 1 to 6 of {counts} entries</span>
        <Pagination
          className="table-pagination"
          variant="outlined"
          shape="rounded"
          count={totalPages}
          page={filter.page}
          onChange={handlePagination}
        />
      </div>
    </Grid>
  );
};

export default function ProductsContainer() {
  const [productFilter, setProductFilter] = useState({
    sortBy: "createdAt",
    sortOrder: -1,
    search: "",
    page: 1,
    limit: 6,
  });
  return (
    <Grid className="admin-container" item md>
      <Header />
      <ProductFeatureBar filter={productFilter} setFilter={setProductFilter} />
      <ProductContentTable
        filter={productFilter}
        setFilter={setProductFilter}
      />
    </Grid>
  );
}
