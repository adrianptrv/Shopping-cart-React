import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

//Styles
import "../styles/Cart.scss"

//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faTrashCan } from '@fortawesome/free-solid-svg-icons'

function Cart({ handleQuan, handleRem, addedItems, totalCartPrice, pageObj }) {

  return (
    <>
      {Array.from(addedItems).map((product, i) => <div className='cartObj' key={i}> 
      <Link to={pageObj[product.id]}><img src={product.image} width={100} height={100}></img></Link>
        <h2 className='prodTitle'>{product.title}</h2>
        <h2 className='prodPrice'>${product.price}</h2>
        <div className='cartQuan'>
        <p className='quanText'>Quantity:</p>
        <button onClick={() => handleQuan(i, "sub", product.price)}><FontAwesomeIcon icon={faMinus} /></button>
        <p className='prodQuan'>{product.quantity}</p>
        <button onClick={() => handleQuan(i, "add", product.price)}><FontAwesomeIcon icon={faPlus} /></button>
        <button className='prodRmv' onClick={() => handleRem(i, product.quantity, product.price)}><FontAwesomeIcon icon={faTrashCan} /></button>
        </div>
       
      </div>)}
      <div className='cartFooter'>
      <h2>Total: ${Math.trunc(totalCartPrice)}</h2>
      <button>Proceed to Checkout</button>
      <button><Link to="/Shopping-cart-React/shop">Back to Shop</Link></button>
      </div>
    </>
  )
}

export default Cart
