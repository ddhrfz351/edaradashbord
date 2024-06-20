import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "../../css/Manage.css";
import { Link } from "react-router-dom";

import { getAuthUser } from "../../helper/Storage";
import axios from "axios";


const Managwarehouses = () => {
  const auth =  getAuthUser();
  const [warehouse, setwarehouse] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setwarehouse({ ...warehouse, loading: true });
    axios
    .get("http://localhost:4000/werahouse", {
      headers: {
        email: auth.email,
       
      },
    })
      .then((resp) => {
        setwarehouse({ ...warehouse, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setwarehouse({
          ...warehouse,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [warehouse.reload]);

  const deletewarehouse = (id) => {
    axios
      .delete("http://localhost:4000/werahouse/" + id, {
        headers: {
          email: auth.email,
        },
      })
      .then((resp) => {
        setwarehouse({ ...warehouse, reload: warehouse.reload + 1 });
      })
      .catch((err) => {});
  };

  return (
    <div className="manage-movies p-5">
      <div className="header d-flex justify-content-between mb-5">
        <h3 className="text-center ">Manage warehouse</h3>
        <Link to={"/manage-warehouse/add"} className="btn btn-success">
          Add New warehouse +
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
            <th>name</th>
            <th>loction</th>
            <th> status</th>
            <th>user_id</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {warehouse.results.map((warehouse) => (
            <tr key={warehouse.id}>
              <td>{warehouse.id}</td>
            
              <td>{warehouse.name}</td>
              <td> {warehouse.location} </td>
              <td>{warehouse.status}</td>
              <td> {warehouse.user_id} </td>
           
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    deletewarehouse(warehouse.id);
                  }}>
                  Delete
                </button>
                <Link
                  to={"" + warehouse.id}
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

export default Managwarehouses;
