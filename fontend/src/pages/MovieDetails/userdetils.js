import React, { useState, useEffect } from "react";
import "../../css/Details.css";

import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";



const UserDetails = () => {
  let { id } = useParams();

  const [user, SetUser] = useState({
    loading: true,
    result: null,
    err: null,
    reload: 0,
  });

  
  useEffect(() => {
    SetUser({ ...user, loading: true });
    axios
      .get("http://localhost:4000/users/" + id)
      .then((resp) => {
        SetUser({ ...user, result: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        SetUser({
          ...user,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [user.reload]);


  return (
    <div className="user-details-container">
      {/* Loader  */}
      {user.loading === true && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {/* LIST userS  */}
      {user.loading === false && user.err == null && (
        <>
          {/* Details user  */}
          <div className="user" >
         

            <div className="col-5">
              <h3>  email :{user.result.email} </h3>
              <p> password:{user.result.password}</p>
              <h3>  status:{user.result.status} </h3>
              <h3> type:{user.result.type} </h3>
              <h3> phone:{user.result.phone} </h3>
              
            </div>
          </div>

         

        
        </>
      )}

      {/* ERRORS HANDLING  */}
      {user.loading === false && user.err != null && (
        <Alert variant="danger" className="p-2">
          {user.err}
        </Alert>
      )}

   
    </div>
  );
};

export default UserDetails;
