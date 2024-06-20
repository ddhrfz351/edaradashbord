import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";
import { useParams } from "react-router-dom";

const Updatewarehouse = () => {
  let { id } = useParams();
  const auth =getAuthUser();
  const [warehouse, setwarehouse] = useState({
    name: "",
    location: "",
    user_id: "",
    status: "",
    err: "",
    loading: false,
    reload: false,
    success: null,
  });


  const Updatewarehouse = (e) => {
    e.preventDefault();
    setwarehouse({ ...warehouse, loading: true });


    axios
    .put("http://localhost:4000/werahouse/" + id, warehouse, {
      headers: {
        email: auth.email,
        
      },
    })
      .then((resp) => {
        setwarehouse({
          name: "",
          location: "",
          user_id: "",
          status: "",

          err: null,
          loading: false,
          success: "warehouse Created Successfully !",
        });
        
      })
      .catch((err) => {
        setwarehouse({
          ...warehouse,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  };

  useEffect(() => {
    axios
    .get("http://localhost:4000/werahouse/" + id, {
      headers: {
        email: auth.email,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((resp) => {
        setwarehouse({
          ...warehouse,
          id: resp.data.id,
        name: resp.data.name,
          status:resp.data.status,
          location:resp.data.location,
          user_id:resp.data.user_id,
        });
      })
      .catch((err) => {
        setwarehouse({
          ...warehouse,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  }, [warehouse.reload]);

  return (
    <div className="login-container">
      <h1>Update warehouse Form</h1>

      {warehouse.err && (
        <Alert variant="danger" className="p-2">
          {warehouse.err}
        </Alert>
      )}

      {warehouse.success && (
        <Alert variant="success" className="p-2">
          {warehouse.success}
        </Alert>
      )}

      <Form onSubmit={Updatewarehouse} className="text-center py-2">
      <Form.Group className="mb-3">
          <Form.Control
            value={warehouse.id}
            onChange={(e) => setwarehouse({ ...warehouse, id: e.target.value })}
            type="text"
            required
            placeholder="warehouse id"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            value={warehouse.location}
            onChange={(e) => setwarehouse({ ...warehouse, location: e.target.value })}
            type="text"
            required
            placeholder="location"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            value={warehouse.name}
            onChange={(e) => setwarehouse({ ...warehouse, name: e.target.value })}
            type="text"
            required
            placeholder="name "
          />
        </Form.Group>
    
        <Form.Group className="mb-3">
          <Form.Control
            value={warehouse.status}
            onChange={(e) => setwarehouse({ ...warehouse, status: e.target.value })}
            type="boolen"
            required
            placeholder="warehouse status"
          />
        </Form.Group>
       
        <Form.Group className="mb-3">
          <Form.Control
            value={warehouse.user_id}
            onChange={(e) => setwarehouse({ ...warehouse, user_id: e.target.value })}
            type="text"
            required
            placeholder="user_id"
          />
        </Form.Group>
      
     
     


        <Button className="btn btn-dark w-100" variant="primary" type="submit">
          Update warehouse
        </Button>
      </Form>
    </div>
  );
};

export default Updatewarehouse;
