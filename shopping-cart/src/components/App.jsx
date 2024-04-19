import React from 'react'
import { useState, useEffect } from 'react'
import reactImg from '../assets/react.svg'
import { Route, Routes, Link } from 'react-router-dom';

import Home from './Home.jsx'
import Shop from './Shop.jsx'
import Cart from './Cart.jsx'

// const newArr = []

function App() {
  // Variable for holding the fetched products
  const [products, SetProducts] = useState()

  // Added to cart variable
  const [addedItems, SetAddedItems] = useState([])

  // Change modal change variable
  const [cartModal, SetCartModal] = useState(false)

  // Fetching products data and assingning it to the products variable.
  useEffect(() => {
    fetch('https://fakestoreapi.com/products/category/electronics')
      .then((response) => response.json())
      .then((data) => {
        SetProducts(data)
      })

  }, [])


  // Handle Cart modal visibility
  const handleCart = () => {
    SetCartModal(!cartModal)
  }


  // We receive the array position and product ID of the clicked item. 
  const handleAdd = (clickNum, productID) => {
    // Then we check if this product id is already in the array, if it is, we increase it's quantity.
    let x = addedItems.findIndex(e => e.id === productID)
    if (x > -1) {
      // newArr[x].quantity += 1

      // const curArr = [...addedItems]
      //Finding the object element in the current array and increase it's quantity
      // curArr[x].quantity += 1
      // SetAddedItems(curArr)
      handleQuantity(x)
    }

    // If it's not we add it to the array
    else {
      // newArr.push(products[clickNum])
      // newArr[clickNum].quantity = 1
      let newEle = products[clickNum];
      newEle.quantity = 1;
      //Writing the current array + adding the new object
      let newObj = [...addedItems, newEle]
      SetAddedItems(newObj)
    }
  }

const handleQuantity = (id) => {
const curArr = [...addedItems]
curArr[id].quantity += 1
SetAddedItems(curArr)
}

  return (
    <>
      {/* Header */}
      <div className='header'>
        <img src={reactImg}></img>
        <div>
          <Link to="/">Home</Link>
          <Link to="shop">Shop</Link>
          <Link to="cart">Cart</Link>
          <p className='CartIcon' onClick={handleCart}>CART ICON</p>
          {cartModal ? <div className='cartWrapper'>
            {addedItems.map((product, i) => <div key={i}> <h1>{product.title}</h1>
              <img src={product.image} width={100} height={100}></img>
              <p>{product.description}</p>
              <h3>{product.price}</h3>
              <p>{product.quantity}</p>
              <button onClick={() => handleQuantity(i)}>Add</button>
              <button onClick={() => handleQuantity(i)}>Remove</button>
            </div>)}
            <button onClick={handleAdd}>Checkout</button>
            <button onClick={handleCart}><Link to="cart">View Cart</Link></button>
          </div> : <></>}
        </div>
      </div>

      {/* Page content */}
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop handleAdding={handleAdd} products={products} />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>

    </>
  )
}

export default App
