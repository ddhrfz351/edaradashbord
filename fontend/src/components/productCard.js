import React from "react";
import { Card } from 'react-bootstrap';
import "../css/Card.css";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  return (
    <div>
      <Card>
        <Card.Img className="card-image" variant="top" src={props.photo} />
        <Card.Body>
          
        <Card.Title> {props.id} </Card.Title>
          <Card.Title> {props.name} </Card.Title>
          <Card.Text>{props.description}</Card.Text>
          <Card.Text>{props.stock}</Card.Text>
          <Card.Text>{props.user_id}</Card.Text>
          <Card.Text>{props.warehouse_id}</Card.Text>
          <Link className="btn btn-dark w-100" to={"/" + props.id}>
            Show More
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;
