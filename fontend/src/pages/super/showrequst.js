import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "../../css/Manage.css";
import { Link } from "react-router-dom";

import axios from "axios";
import { getAuthUser } from "../../helper/Storage";

const ManageRequests = () => {
  const auth = getAuthUser();
  const [requests, setRequests] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setRequests({ ...requests, loading: true });
    axios
      .get("http://localhost:4000/requst/super", {
        headers:{
          email:auth.email,
        },
        params: {
          user_id: auth.id,
        },
      })
      .then((resp) => {
        setRequests({
          ...requests,
          results: resp.data,
          loading: false,
          err: null,
        });
        console.log(resp);
      })
      .catch((err) => {
        setRequests({
          ...requests,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [requests.reload]);

  console.log({ requests });


  return (
    <div className="manage-movies p-5">
      <div className="header d-flex justify-content-between mb-5">
        <h3 className="text-center ">show request</h3>
        <Link to={"/Addrequest"} className="btn btn-success">
          Add New Request +
        </Link>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>user_id</th>
            <th>product_id</th>
            <th>warehouse_id</th>
            <th>stock</th>
            <th>operation</th>
            <th>status</th>
            <th>history</th>
          
          </tr>
        </thead>
        <tbody>
          {requests.results.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.user_id}</td>
              <td>{request.product_id}</td>
              <td>{request.warehouse_id}</td>
              <td>{request.stock}</td>
              <td>{request.operation}</td>
              <td>{request.status}</td>
              <td>{request.history}</td>
              
              
            </tr>
          ))}

        </tbody>
      </Table>
    </div>
  );
};

export default ManageRequests;