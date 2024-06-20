import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";

const Addrequest = () => {
  const auth = getAuthUser();
  const [request, setUrequest] = useState({
    request_id: "",
    warehouse_id: "",
    product_id: "",
    stock: "",
    operation: "",
    status: "",
    history: "",

    err: "",
    loading: false,
    success: null,
  });



  const Addrequest= (e) => {
    e.preventDefault();
    const auth = getAuthUser();
    setUrequest({ ...request, loading: true });


    axios
      .post("http://localhost:4000/requst", request, {
       
      })
      .then((resp) => {
        setUrequest({
          user_id: "",
          warehouse_id: "",
          product_id: "",
          stock: "",
          operation: "",
          status: "",
          history: "",
          err: null,
          loading: false,
          success: "request Created Successfully !",
        });

      })
      .catch((err) => {
        setUrequest({
          ...request,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  };

  return (
    <div className="login-container">
      <h1>Add New request</h1>

      {request.err && (
        <Alert variant="danger" className="p-2">
          {request.err}
        </Alert>
      )}

      {request.success && (
        <Alert variant="success" className="p-2">
          {request.success}
        </Alert>
      )}

      <Form onSubmit={Addrequest}>
        <Form.Group className="mb-3">
          <Form.Control
            value={request.user_id}
            onChange={(e) => setUrequest({ ...request,user_id: e.target.value })}
            type="text"
            required
            placeholder="request user_id"
          />
        </Form.Group>
      
        <Form.Group className="mb-3">
          <Form.Control
            value={request.warehouse_id}
            onChange={(e) => setUrequest({ ...request, warehouse_id: e.target.value })}
            type="warehouse_id"
            required
            placeholder="warehouse_id"
          />
          
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            value={request.product_id}
            onChange={(e) => setUrequest({ ...request, product_id: e.target.value })}
            type="product_id"
            required
            placeholder="product_id"
          />
          
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            value={request.stock}
            onChange={(e) => setUrequest({ ...request, stock: e.target.value })}
            type="stock"
            required
            placeholder="stock"
          />
        </Form.Group>
    
    
        <Form.Group className="mb-3">
          <Form.Control
            value={request.status}
            onChange={(e) => setUrequest({ ...request, status: e.target.value })}
            type="text"
            
            placeholder="request status"
          />
        </Form.Group>
       
        <Form.Group className="mb-3">
          <Form.Control
            value={request.operation}
            onChange={(e) => setUrequest({ ...request, operation: e.target.value })}
            type="text"
            required
            placeholder="operation"
          />
        </Form.Group>
      
        <Form.Group className="mb-3">
          <Form.Control
            value={request.history}
            onChange={(e) => setUrequest({ ...request,history: e.target.value })}
            type="text"
            required
            placeholder="history"
          />
        </Form.Group>


        <Button className="btn btn-dark w-100" variant="primary" type="submit">
          Add New request
        </Button>
      </Form>
    </div>
  );
};

export default Addrequest;
