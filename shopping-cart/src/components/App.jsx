import React from 'react'
import { useState, useEffect } from 'react'
import reactImg from '../assets/react.svg'
import { Route, Routes, Link } from 'react-router-dom';

import Home from './Home.jsx'
import Shop from './Shop.jsx'
import Cart from './Cart.jsx'

const newArr = []

function App() {
  // Variable for holding the fetched products
  const [products, SetProducts] = useState()

  // Added to cart variable
  const [added, SetAdded] = useState()

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



  const handleAdd = (clickNum) => {
    console.log(clickNum)
   
    // console.log(newArr)

    const nums = [9, 10, 11, 12, 13, 14]

    for (let i = 0; i <= nums.length; i++) {
      let x = newArr.findIndex(e => e.id === nums[i])
      if (x > -1) {
        console.log("da")
        console.log(x)
        newArr[x].quantity += 1
      }
      else {
        newArr.push(products[clickNum])
        newArr[clickNum].quantity = 1
      }
    }
    console.log(newArr)

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
            {products && products.map((product, i) => <div key={i}> <h1>{product.title}</h1>
              <img src={product.image} width={100} height={100}></img>
              <p>{product.description}</p>
              <h3>{product.price}</h3>
              <p>{product.id}</p>
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
