import { Grid } from "@material-ui/core";
import AdminSideBar from "pages/AdminPage/AdminSideBar";
import EditProductContainer from "./EditProductContainer";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import {getProduct} from "services/ProductService";

const EditProduct = () => {
  require("assets/sass/admin.scss");
  const [product, setProduct] = useState({});
  const useQuery = new URLSearchParams(useLocation().search);
  const [loading, setLoading] = useState(true);
  let productID = useQuery.get("productID");
  useEffect(() => {
    const fetchProduct = async () => {
      let res = await getProduct(productID);
      if (res.status === "success") {
        setProduct(res.data.product);
        setLoading(false);
      } else {
        console.log(res.error.message);
      }
    };
    fetchProduct();
  }, [productID]);
  return (
    !loading && (
      <Grid container direction="row">
        <AdminSideBar selected="products_sidebar" />
        <EditProductContainer product={product} setProduct={setProduct} />
      </Grid>
    )
  );
};
export default EditProduct;
