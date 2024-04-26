import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';




function Cart({ handleQuan, handleRem, addedItems, totalCartPrice, pageObj }) {

  return (
    <>
      {Array.from(addedItems).map((product, i) => <div key={i}> <h1>{product.title}</h1>
        <img src={product.image} width={100} height={100}></img>
        <p>{product.description}</p>
        <h3>${product.price}</h3>
        <p>{product.quantity}</p>
        <button><Link to={pageObj[product.id]}>Go to page</Link></button>
        <button onClick={() => handleQuan(i, "add", product.price)}>Add</button>
        <button onClick={() => handleQuan(i, "sub", product.price)}>Substract</button>
        <button onClick={() => handleRem(i, product.quantity, product.price)}>Remove</button>
      </div>)}
      <h2>${totalCartPrice}</h2>
      <button>Proceed to Checkout</button>
      <button><Link to="/shop">Back to Shop</Link></button>
    </>
  )
}

export default Cart
