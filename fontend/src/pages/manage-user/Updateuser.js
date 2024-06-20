import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";
import { useParams } from "react-router-dom";

const Updateuser = () => {
  let { id } = useParams();
  const auth = getAuthUser();
  const [user, setuser] = useState({
    email: "",
    password: "",
    status: "",
    type: "",
    phone: "",
    err: "",
    loading: false,
    reload: false,
    success: null,
  });


  const Updateuser = (e) => {
    e.preventDefault();

    setuser({ ...user, loading: true });


    axios
      .put("http://localhost:4000/users/" + id, user, {
        headers: {
          email: auth.email,

        },
      })
      .then((resp) => {
        setuser({
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
        setuser({
          ...user,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/users/" + id, {
        headers: {
          email: auth.email,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setuser({
          ...user,
          id: resp.data.id,
          email: resp.data.email,
          password: resp.data.password,
          status: resp.data.status,
          type: resp.data.type,
          phone: resp.data.phone,
        });
      })
      .catch((err) => {
        setuser({
          ...user,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  }, [user.reload]);

  return (
    <div className="login-container">
      <h1>Update user Form</h1>

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

      <Form onSubmit={Updateuser} className="text-center py-2">
        <Form.Group className="mb-3">
          <Form.Control
            value={user.email}
            onChange={(e) => setuser({ ...user, email: e.target.value })}
            type="text"
            required
            placeholder="user Name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            value={user.password}
            onChange={(e) => setuser({ ...user, password: e.target.value })}
            type="password"
            required
            placeholder="password "
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            value={user.status}
            onChange={(e) => setuser({ ...user, status: e.target.value })}
            type="text"
            required
            placeholder="user status"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            value={user.type}
            onChange={(e) => setuser({ ...user, type: e.target.value })}
            type="text"
            required
            placeholder="utype"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            value={user.phone}
            onChange={(e) => setuser({ ...user, phone: e.target.value })}
            type="text"
            required
            placeholder="user phone"
          />
        </Form.Group>




        <Button className="btn btn-dark w-100" variant="primary" type="submit">
          Update user
        </Button>
      </Form>
    </div>
  );
};

export default Updateuser;
