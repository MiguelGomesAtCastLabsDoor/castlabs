import { Shoe } from "./Shoe";
import React from "react";
import { Link } from 'react-router-dom';


interface ShoeCardProps {
  shoe: Shoe;
  onOrdering?: (shoe: Shoe) => void;
}

function ShoeCard(props: ShoeCardProps) {
  const { shoe, onOrdering } = props;
  const handleOrdering = (shoeBeingOrdered: Shoe) => {
    onOrdering?(shoeBeingOrdered):null;
  };
  return (
    <div className="card">
      <img src={shoe.image} alt={shoe.friendlyName} />
      <section className="section dark">
        <Link to={'/shoes/' + shoe.id}>
        <h5 className="strong">
          <strong>{shoe.brand}</strong>
        </h5>
        <p>{shoe.friendlyName}</p>
        <p>Price : {shoe.price.toLocaleString()}</p>
        </Link>
          <button
          className=" bordered"
          onClick={() => {
            handleOrdering(shoe);
          }}
        >
          <span className="icon-edit "></span>
          Order
        </button>
      </section>
    </div>
  );
}

export default ShoeCard;
