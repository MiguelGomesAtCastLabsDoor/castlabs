import React from 'react';
import { Shoe } from './Shoe';

interface ShoeDetailProps {
  shoe: Shoe;
}
export default function ShoeDetail({ shoe }: ShoeDetailProps) {
  return (
    <div className="row">
      <div className="col-sm-6">
        <div className="card large">
          <img
            className="rounded"
            src={shoe.image}
            alt={shoe.friendlyName}
          />
          <section className="section dark">
            <h3 className="strong">
              <strong>{shoe.brand}</strong>
            </h3>
            <p>{shoe.friendlyName}</p>
            <p>Price : {shoe.price}</p>
          </section>
        </div>
      </div>
    </div>
  );
}