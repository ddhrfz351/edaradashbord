import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "../../css/Manage.css";
import { Link } from "react-router-dom";

import axios from "axios";
import { getAuthUser } from "../../helper/Storage";

const Managusers = () => {
  const auth = getAuthUser();
  const [user, setuser] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setuser({ ...user, loading: true });
    axios
      .get("http://localhost:4000/users", {
        headers: {
          email: auth.email,

        },
      })
      .then((resp) => {
        setuser({ ...user, results: resp.data, loading: false, err: null });
        console.log(resp);


      })
      .catch((err) => {
        setuser({
          ...user,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [user.reload]);
  console.log({ user })
  const deleteuser = (id) => {
    axios
      .delete("http://localhost:4000/users/" + id, {
        headers: {
          email: auth.email,
        },
      })
      .then((resp) => {
        setuser({ ...user, reload: user.reload + 1 });
      })
      .catch((err) => { });
  };

  return (
    <div className="manage-movies p-5">
      <div className="header d-flex justify-content-between mb-5">
        <h3 className="text-center ">Manage users</h3>
        <Link to={"/manage-user/add"} className="btn btn-success">
          Add New user +
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
            <th>email</th>
            <th> password</th>
            <th> status</th>
            <th> type</th>
            <th> phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {user.results.map((user) => (
            <tr key={user.id}>


              <td> {user.id} </td>
              <td>{user.email}</td>
              <td> {user.password} </td>
              <td>{user.status}</td>
              <td> {user.type} </td>
              <td>{user.phone}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    deleteuser(user.id);
                  }}>
                  Delete
                </button>
                <Link
                  to={"" + user.id}
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

export default Managusers;
