import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';




function Cart({ handleQuan, handleRem, addedItems }) {

  return (
    <>
      {Array.from(addedItems).map((product, i) => <div key={i}> <h1>{product.title}</h1>
        <img src={product.image} width={100} height={100}></img>
        <p>{product.description}</p>
        <h3>${product.price}</h3>
        <p>{product.quantity}</p>
        <button onClick={() => handleQuan(i, "add")}>Add</button>
        <button onClick={() => handleQuan(i, "sub")}>Substract</button>
        <button onClick={() => handleRem(i, product.quantity, product.price)}>Remove</button>
      </div>)}
      <button>Proceed to Checkout</button>
      <button><Link to="/shop">Back to Shop</Link></button>
    </>
  )
}

export default Cart
