import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";
import { useParams } from "react-router-dom";

const Updaterequest = () => {
  let { id } = useParams();
  const auth = getAuthUser();
  const [request, setrequest] = useState({
   
    product_id: "",
    stock: "",
    operation: "",
    status: "",
    history: "",
    err: "",
    loading: false,
    reload: false,
    success: null,
  });


  const Updaterequest = (e) => {
    e.preventDefault();

    setrequest({ ...request, loading: true });

    axios
      .put("http://localhost:4000/requst/req/" + id, request, {
        headers: {
          email: auth.email,

        },
      })
      .then((resp) => {
        setrequest({
         
          
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
        setrequest({
          ...request,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  };


  useEffect(() => {
    axios
      .get("http://localhost:4000/requst/" + id, {
        headers: {
          email: auth.email,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setrequest({
          ...request,
          id:resp.data.id,
          product_id: resp.data.product_id,
          stock: resp.data.stock,
          operation: resp.data.operation,
          status: resp.data.status,
          history: resp.data.history,
        });
      })
      .catch((err) => {
        setrequest({
          ...request,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  }, [request.reload]);

  return (
    <div className="login-container">
      <h1>Update request Form</h1>

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

      <Form onSubmit={Updaterequest} className="text-center py-2">
        <Form.Group className="mb-3">
          <Form.Control
            value={request.id}
            onChange={(e) => setrequest({ ...request, id: e.target.value })}
            type="text"
            required
            placeholder="request id"
          />
        </Form.Group>

        
     
        <Form.Group className="mb-3">
          <Form.Control
            value={request.product_id}
            onChange={(e) => setrequest({ ...request, product_id: e.target.value })}
            type="text"
            required
            placeholder="id "
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            value={request.stock}
            onChange={(e) => setrequest({ ...request, stock: e.target.value })}
            type="text"
            required
            placeholder="stock"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            value={request.operation}
            onChange={(e) => setrequest({ ...request, operation: e.target.value })}
            type="text"
            required
            placeholder="opertion "
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            value={request.status}
            onChange={(e) => setrequest({ ...request, status: e.target.value })}
            type="boolen"
            required
            placeholder="request status"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            value={request.history}
            onChange={(e) => setrequest({ ...request, history: e.target.value })}
            type="text"
            required
            placeholder="history"
          />
        </Form.Group>
     





      <Button className="btn btn-dark w-100" variant="primary" type="submit">
        Update request
      </Button>
    </Form>
    </div >
  );
};

export default Updaterequest;
