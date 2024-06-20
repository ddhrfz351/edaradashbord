import React, {  useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";

const Addwarehouse = () => {
  const auth = getAuthUser();
  const [warehouse, setwarehouse] = useState({
    name: "",
    location: "",
    user_id: "",
    status: "",

    err: "",
    loading: false,
    success: null,
  });


  const Addwarehouse = (e) => {
    e.preventDefault();

    setwarehouse({ ...warehouse, loading: true });

    
    axios
      .post("http://localhost:4000/werahouse", warehouse, {
        headers: {
          email: auth.email,
        
        },
      })
      .then((resp) => {
        setwarehouse({
          name: "",
          location: "",
          status: "",
          user_id:"",
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

  return (
    <div className="login-container">
      <h1>Add New warehouse</h1>

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

      <Form onSubmit={Addwarehouse}>
        <Form.Group className="mb-3">
          <Form.Control
            value={warehouse.name}
            onChange={(e) => setwarehouse({ ...warehouse, name: e.target.value })}
            type="text"
            required
            placeholder="warehouse Name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            value={warehouse.location}
            onChange={(e) => setwarehouse({ ...warehouse, location: e.target.value })}
            type="text"
            required
            placeholder="warehouse loction"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            value={warehouse.status}
            onChange={(e) => setwarehouse({ ...warehouse, status: e.target.value })}
            type="boolen"
            required
            placeholder="status"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            value={warehouse.user_id}
            onChange={(e) => setwarehouse({ ...warehouse, user_id: e.target.value })}
            type="text"
            required
            placeholder="warehouse user"
          />
        </Form.Group>

        


        <Button className="btn btn-dark w-100" variant="primary" type="submit">
          Add New warehouse
        </Button>
      </Form>
    </div>
  );
};

export default Addwarehouse;
