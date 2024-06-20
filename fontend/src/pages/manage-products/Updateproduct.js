import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";
import { useParams } from "react-router-dom";

const Updateproduct = () => {
  let { id } = useParams();
  const auth = getAuthUser();
  const [product, setproduct] = useState({
    name: "",
    description: "",
    stock:"",
    photo: null,
    user_id:"",
    warehouse_id:"",
    err: "",
    loading: false,
    reload: false,
    success: null,
  });
  const photo = useRef(null);

  const updateproduct = (e) => {
    e.preventDefault();

    setproduct({ ...product, loading: true });

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("stock", product.stock);
    formData.append("user_id", product.user_id);
    formData.append("warhouse_id", product.warehouse_id);
  
    axios
      .put("http://localhost:4000/products/" + id, formData, {
        headers: {
          email: auth.email,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setproduct({
          ...product,
          loading: false,
          success: "product updated successfully !",
          reload: product.reload + 1,
        });
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

  useEffect(() => {
    axios
      .get("http://localhost:4000/products/" + id)
      
      .then((resp) => {
        setproduct({
          ...product,
          name: resp.data.name,
          user_id: resp.data.user_id,
          stock: resp.data.stock,
          warehouse_id: resp.data.warehouse_id,
          description: resp.data.description,
          photo: resp.data.photo,
        });
      })
      .catch((err) => {
        setproduct({
          ...product,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  }, [product.reload]);

  return (
    <div className="login-container">
      <h1>Update product Form</h1>

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

      <Form onSubmit={updateproduct} className="text-center py-2">
        <img
          alt={product.name}
          style={{
            width: "50%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "10px",
            border: "1px solid #ddd",
            marginBottom: "10px",
          }}
          src={product.photo}
        />

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="product Name"
            value={product.name}
            onChange={(e) => setproduct({ ...product, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <textarea
            className="form-control"
            placeholder="Description"
            value={product.description}
            onChange={(e) =>
              setproduct({ ...product, description: e.target.value })
            }
            rows={5}></textarea>
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
            value={product.stock}
            onChange={(e) => setproduct({ ...product, stock: e.target.value })}
            type="text"
            required
            placeholder="stock"
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
          Update product
        </Button>
      </Form>
    </div>
  );
};

export default Updateproduct;
