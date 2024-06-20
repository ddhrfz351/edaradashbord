import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "../css/Header.css";
import { removeAuthUser, getAuthUser } from "../helper/Storage";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const auth = getAuthUser();
  const Logout = () => {
    removeAuthUser();
    navigate("/");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link className="nav-link" to={"/"}>
              Edara App
            </Link>
          </Navbar.Brand>
          <Nav className="me-auto">
        
      

            {/* unAuthenticated Route  */}
            {!auth && (
              <>
                <Link className="nav-link" to={"/login"}>
                  Login
                </Link>
            
              </>
            )}
            
             {auth &&auth.type === 0 &&  (
              <>
                
                <Link className="nav-link" to={"/showhistory/:user_id"}>
                showrequest
                </Link>
                <Link className="nav-link" to={"/Showproduct"}>
                showeproducts
                </Link>
            
           
           
              </>
            )}


            {/* Admin Routes  */}

            {auth && auth.type === 1 && (
              <>
                <Link className="nav-link" to={"/manage-products"}>
                  Manage product
                </Link>
                <Link className="nav-link" to={"/manage-user"}>
                  Manage user
                </Link>
                <Link className="nav-link" to={"/manage-warehouse"}>
                  Manage warehouse
                </Link>
                <Link className="nav-link" to={"/manage-request"}>
                  Manage request
                </Link>
              </>
            )}
          </Nav>

          <Nav className="ms-auto">
            {/* Authenticated Routes  */}
            {auth && <Nav.Link onClick={Logout}>Logout</Nav.Link>}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
