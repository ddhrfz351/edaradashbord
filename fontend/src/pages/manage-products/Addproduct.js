import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";

const Addproduct = () => {
  const auth = getAuthUser();
  const [product, setproduct] = useState({
    name: "",
    description: "",
    stock: "",
    user_id: "",
    warehouse_id: "",

    err: "",
    loading: false,
    success: null,
  });

  const photo = useRef(null);

  const createproduct = (e) => {
    e.preventDefault();

    setproduct({ ...product, loading: true });

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("stock", product.stock);
    formData.append("user_id", product.user_id);
    formData.append("warehouse_id", product.warehouse_id);
    if (photo.current.files && photo.current.files[0]) {
      formData.append("photo", photo.current.files[0]);
    }
    axios
      .post("http://localhost:4000/products", formData, {
        headers: {
          email: auth.email,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setproduct({
          name: "",
          description: "",
          stock: "",
          user_id: "",
          warehouse_id: "",
          err: null,
          loading: false,
          success: "product Created Successfully !",
        });
        photo.current.value = null;
      })
      .catch((err) => {
        setproduct({
          ...product,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  };

  return (
    <div className="login-container">
      <h1>Add New product Form</h1>

      {product.err && (
        <Alert variant="danger" className="p-2">
          {product.err}
        </Alert>
      )}

      {product.success && (
        <Alert variant="success" className="p-2">
          {product.success}
        </Alert>
      )}

      <Form onSubmit={createproduct}>
        <Form.Group className="mb-3">
          <Form.Control
            value={product.name}
            onChange={(e) => setproduct({ ...product, name: e.target.value })}
            type="text"
            required
            placeholder="product Name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <textarea
            className="form-control"
            placeholder="Description"
            value={product.description}
            required
            onChange={(e) =>
              setproduct({ ...product, description: e.target.value })
            }
            rows={5}></textarea>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            value={product.stock}
            onChange={(e) => setproduct({ ...product, stock: e.target.value })}
            type="text"
            required
            placeholder="product stock"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <input type="file" className="form-control" ref={photo} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            value={product.user_id}
            onChange={(e) => setproduct({ ...product, user_id: e.target.value })}
            type="text"
            required
            placeholder="user_id"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            value={product.warehouse_id}
            onChange={(e) => setproduct({ ...product, warehouse_id: e.target.value })}
            type="text"
            required
            placeholder="warehouse_id"
          />
        </Form.Group>
        
        <Button className="btn btn-dark w-100" variant="primary" type="submit">
          Add New product
        </Button>
      </Form>
    </div>
  );
};

export default Addproduct;
