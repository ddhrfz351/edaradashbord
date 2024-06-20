import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "../../css/Manage.css";
import { Link } from "react-router-dom";

import axios from "axios";
import { getAuthUser } from "../../helper/Storage";

const Manageproducts = () => {
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
      .get("http://localhost:4000/products")
      .then((resp) => {
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

  const deleteproduct = (id) => {
    axios
      .delete("http://localhost:4000/products/" + id, {
        headers: {
          email: auth.email,
        },
      })
      .then((resp) => {
        setproducts({ ...products, reload: products.reload + 1 });
      })
      .catch((err) => {});
  };

  return (
    <div className="manage-products p-5">
      <div className="header d-flex justify-content-between mb-5">
        <h3 className="text-center ">Manage products</h3>
        <Link to={"/manage-products/add"} className="btn btn-success">
          Add New product +
        </Link>
      </div>

      {/* <Alert variant="danger" className="p-2">
        This is simple alert
      </Alert>

      <Alert variant="success" className="p-2">
        This is simple alert
      </Alert> */}

      <Table striped bordered hover>
        <thead>
          <tr>
          <th>id</th>
            <th>Image</th>
            <th> Name</th>
            <th> Description</th>
            <th> stock</th>
            <th>user_id</th>
            <th> warehouse_id</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.results.map((product) => (
            <tr key={product.id}>
             <td>{product.id}</td>
              <td>
                <img
                  src={product.photo}
                  alt={product.name}
                  className="image-avatar"
                />
              </td>
              <td> {product.name} </td>
              <td>{product.description}</td>
              <td>{product.stock}</td>
              <td>{product.user_id}</td>
               <td>{product.warehouse_id}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    deleteproduct(product.id);
                  }}>
                  Delete
                </button>
                <Link
                  to={"" + product.id}
                  className="btn btn-sm btn-primary mx-2">
                  Update
                </Link>
               
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Manageproducts;
