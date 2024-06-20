import React, { useState, useEffect } from "react";
import "../../css/Details.css";

import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";



const ProductDetails = () => {
  let { id } = useParams();

  const [product, setproduct] = useState({
    loading: true,
    result: null,
    err: null,
    reload: 0,
  });

  
  useEffect(() => {
    setproduct({ ...product, loading: true });
    axios
      .get("http://localhost:4000/products/" + id)
      .then((resp) => {
        setproduct({ ...product, result: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setproduct({
          ...product,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [product.reload]);


  return (
    <div className="product-details-container">
      {/* Loader  */}
      {product.loading === true && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {/* LIST productS  */}
      {product.loading === false && product.err == null && (
        <>
          {/* Details product  */}
          <div className="product" >
            <div className="col-5">
              <img
                className="product-image"
                src={product.result.photo}
                alt={product.result.name}
              />
            </div>

            <div className="col-5">
              <h3>  name :{product.result.name} </h3>
              <p> description:{product.result.description}</p>
              <h3>  stock:{product.result.stock} </h3>
              <h3> warehouse_id:{product.result.warehouse_id} </h3>
              <h3> user_id:{product.result.user_id} </h3>
              
            </div>
          </div>

         

        
        </>
      )}

      {/* ERRORS HANDLING  */}
      {product.loading === false && product.err != null && (
        <Alert variant="danger" className="p-2">
          {product.err}
        </Alert>
      )}

   
    </div>
  );
};

export default ProductDetails;
