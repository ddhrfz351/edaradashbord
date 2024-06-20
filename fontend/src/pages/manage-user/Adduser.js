import React, {  useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";

const Adduser = () => {
  const auth = getAuthUser();
  const [user, setUSER] = useState({
    email: "",
    password: "",
    status: "",
    type: "",
    phone: "",
    err: "",
    loading: false,
    success: null,
  });



  const Adduser = (e) => {
    e.preventDefault();
    const auth = getAuthUser();
    setUSER({ ...user, loading: true });

 
    axios
      .post("http://localhost:4000/auth/register", user, {
        headers: {
          email: auth.email,
          
        },
      })
      .then((resp) => {
        setUSER({
          email: "",
          password: "",
          status: "",
          type: "",
          phone: "",

          err: null,
          loading: false,
          success: "user Created Successfully !",
        });
      
      })
      .catch((err) => {
        setUSER({
          ...user,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  };

  return (
    <div className="login-container">
      <h1>Add New user</h1>

      {user.err && (
        <Alert variant="danger" className="p-2">
          {user.err}
        </Alert>
      )}

      {user.success && (
        <Alert variant="success" className="p-2">
          {user.success}
        </Alert>
      )}

      <Form onSubmit={Adduser}>
        <Form.Group className="mb-3">
          <Form.Control
            value={user.email}
            onChange={(e) => setUSER({ ...user, email: e.target.value })}
            type="text"
            required
            placeholder="user Name"
          />
        </Form.Group>
      
        <Form.Group className="mb-3">
          <Form.Control
            value={user.password}
            onChange={(e) => setUSER({ ...user, password: e.target.value })}
            type="password"
            required
            placeholder="password "
          />
        </Form.Group>
    
        <Form.Group className="mb-3">
          <Form.Control
            value={user.status}
            onChange={(e) => setUSER({ ...user, status: e.target.value })}
            type="text"
            required
            placeholder="user status"
          />
        </Form.Group>
       
        <Form.Group className="mb-3">
          <Form.Control
            value={user.type}
            onChange={(e) => setUSER({ ...user, type: e.target.value })}
            type="text"
            required
            placeholder="utype"
          />
        </Form.Group>
      
        <Form.Group className="mb-3">
          <Form.Control
            value={user.phone}
            onChange={(e) => setUSER({ ...user, phone: e.target.value })}
            type="text"
            required
            placeholder="user phone"
          />
        </Form.Group>
     
     

        <Button className="btn btn-dark w-100" variant="primary" type="submit">
          Add New user
        </Button>
      </Form>
    </div>
  );
};

export default Adduser;
