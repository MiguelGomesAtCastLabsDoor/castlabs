import React, { useState } from "react";
import { Shoe } from "./Shoe";
import ShoeCard from "./ShoeCard";
import ShoeForm from "./ShoeForm";

interface ShoeListProps {
  shoes: Shoe[];
  onSave: (shoe: Shoe) => void;
}

function ShoeList({ shoes, onSave }: ShoeListProps) {
  const [shoeBeingOrdered, setShoeBeingOrdered] = useState({});
  const handleOrdering = (shoe: Shoe) => {
    setShoeBeingOrdered(shoe);
  };
  const cancelOrdering = () => {
    setShoeBeingOrdered({});
  };
  const items = shoes.map((shoe) => (
    <div key={shoe.id} className="cols-sm">
      {shoe === shoeBeingOrdered ? (
        <ShoeForm shoe={shoe} onSave={onSave} onCancel={cancelOrdering} />
      ) : (
        <ShoeCard shoe={shoe} onOrdering={handleOrdering} />
      )}
    </div>
  ));
  return <div className="row">{items}</div>;
}

export default ShoeList;
