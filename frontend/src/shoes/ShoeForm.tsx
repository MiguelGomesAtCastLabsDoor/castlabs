import React, { SyntheticEvent, useState } from 'react';
import { Shoe } from './Shoe';

interface ShoeFormProps {
    shoe: Shoe;
    onSave: (shoe: Shoe) => void;
   onCancel: () => void;
 }
function ShoeForm({ shoe: initialShoe, onSave, onCancel }: ShoeFormProps) {
    const [shoe, setShoe] = useState(initialShoe);
     const [errors, setErrors] = useState({
     brand: '',
     friendlyName: '',
     price: '',
 });
     const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!isValid()) return;
    onSave(shoe);
  };
  const handleChange = (event: any) => {
    const { type, name, value, checked } = event.target;
    // if input type is checkbox use checked
    // otherwise it's type is text, number etc. so use value
    let updatedValue = type === 'checkbox' ? checked : value;

    //if input type is number convert the updatedValue string to a +number
    if (type === 'number') {
      updatedValue = Number(updatedValue);
    }
    const change = {
      [name]: updatedValue,
    };

    let updatedShoe: Shoe;
    // need to do functional update b/c
    // the new shoe state is based on the previous shoe state
    // so we can keep the shoe properties that aren't being edited +like shoe.id
    // the spread operator (...) is used to
    // spread the previous shoe properties and the new change
    setShoe((p) => {
      updatedShoe = new Shoe({ ...p, ...change });
      return updatedShoe;
    });
    setErrors(() => validate(updatedShoe));
  };
    function validate(shoe: Shoe) {
    let errors: any = { brand: '', friendlyName: '', price: '' };
    if (shoe.brand.length === 0) {
      errors.brand = 'Brand is required';
    }
    if (shoe.brand.length > 0 && shoe.brand.length < 3) {
      errors.brand = 'Brand needs to be at least 3 characters.';
    }
    if (shoe.friendlyName.length === 0) {
      errors.friendlyName = 'Shoe display name is required.';
    }
    if (shoe.price <= 0) {
      errors.price = 'Price must be more than $0.';
    }
    return errors;
  }
  function isValid() {
    return (
      errors.brand.length === 0 &&
     errors.friendlyName.length === 0 &&
      errors.price.length === 0
    );
  }
  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      <label htmlFor="brand">Shoe Brand</label>
      <input type="text" name="brand" placeholder="enter brand" value={shoe.brand}
       onChange={handleChange}/>
        {errors.brand.length > 0 && (
        <div className="card error">
          <p>{errors.brand}</p>
        </div>
      )}
      <label htmlFor="friendlyName">Shoe Display Name</label>
      <textarea name="friendlyName" placeholder="enter display name" value={shoe.friendlyName}
       onChange={handleChange}/>
        {errors.friendlyName.length > 0 && (
        <div className="card error">
          <p>{errors.friendlyName}</p>
        </div>
      )}
      <label htmlFor="price">Shoe Price</label>
      <input type="number" name="price" placeholder="enter price" value={shoe.price}
       onChange={handleChange}/>
        {errors.price.length > 0 && (
        <div className="card error">
          <p>{errors.price}</p>
        </div>
      )}


      <div className="input-group">
        <button className="primary bordered medium">Save</button>
        <span />
        <button type="button" className="bordered medium" onClick={onCancel}>
          cancel
        </button>
      </div>
    </form>
  );
}

export default ShoeForm;
