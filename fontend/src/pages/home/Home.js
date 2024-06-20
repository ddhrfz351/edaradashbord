import React, { useState, useEffect } from "react";
import { getAuthUser } from "../../helper/Storage";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { Container, Row, Col } from 'react-bootstrap';
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

  const [search, setSearch] = useState("");

  useEffect(() => {
    setproducts({ ...products, loading: true });
    axios
      .get("http://localhost:4000/products", {
        params: {
          search: search,
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

  const searchproducts = (e) => {
    e.preventDefault();
    setproducts({ ...products, reload: products.reload + 1 });
  };

  return (
    <div className="home-container p-5">
          <Container
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{
        b: "url('path/to/image.jpg')",
        backgroundSize: "cover",
        height: "10vh",
        backgroundColor: "#F0F9FF",
        marginBottom: '30px' 
      }}
    >
      <h1>Edara Dashboard </h1>
    </Container>
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
          {/* Filter  */}
          <Form onSubmit={searchproducts}>
            <Form.Group className="mb-3 d-flex">
              <Form.Control
                type="text"
                placeholder="Search products"
                className="rounded-0"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-dark rounded-0">Search</button>
            </Form.Group>
          </Form>

          {/* LIST products  */}
          <div className="row ">
            {products.results.map((product) => (
              <div className="col-3 card-movie-contAainer" key={product.id}>
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
