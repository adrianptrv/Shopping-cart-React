import { useState, useEffect } from 'react'



function Cart({addedItems}) {

  return (
   <>
{Array.from(addedItems).map((product, i) => <div key={i}> <h1>{product.title}</h1>
              <img src={product.image} width={100} height={100}></img>
              <p>{product.description}</p>
              <h3>{product.price}</h3>
              <p>{product.quantity}</p>
              <button onClick={() => handleQuantity(i, "add")}>Add</button>
              <button onClick={() => handleQuantity(i, "sub")}>Substract</button>
              <button onClick={() => handleRemove(i)}>Remove</button>
            </div>)}
   </>
  )
}

export default Cart
