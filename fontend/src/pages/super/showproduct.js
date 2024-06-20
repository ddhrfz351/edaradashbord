import React, { useState, useEffect } from "react";
import { getAuthUser } from "../../helper/Storage";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import ProductCard from "../../components/productCard";
const Home = () => {
  const auth = getAuthUser();
  const [products, setproducts] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });



  useEffect(() => {
    setproducts({ ...products, loading: true });
    axios
      .get("http://localhost:4000/products/super", {
        params: {
         user_id :auth.id,
        },
      })
      .then((resp) => {
        console.log(resp);
        setproducts({ ...products, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setproducts({
          ...products,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [products.reload]);

 
  return (
    <div className="home-container p-5">
      {/* Loader  */}
      {products.loading === true && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {/* LIST products  */}
      {products.loading === false && products.err == null && (
        <>
      
          {/* LIST products  */}
          <div className="row ">
            {products.results.map((product) => (
              <div className="col-3 card-movie-container" key={product.id}>
                < ProductCard
                  name={product.name}
                  description={product.description}
                  photo={product.photo}
                  id={product.id}
                  user_id={product.user_id}
                  warehouse_id={product.warehouse_id}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/* ERRORS HANDLING  */}
      {products.loading === false && products.err != null && (
        <Alert variant="danger" className="p-2">
          {products.err}
        </Alert>
      )}

      {products.loading === false &&
        products.err == null &&
        products.results.length === 0 && (
          <Alert variant="info" className="p-2">
            No products, please try again later !
          </Alert>
        )}
    </div>
  );
};

export default Home;
