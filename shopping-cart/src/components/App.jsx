import React from 'react'
import { useState, useEffect } from 'react'
import reactImg from '../assets/react.svg'
import { Route, Routes, Link } from 'react-router-dom';

import Home from './Home.jsx'
import Shop from './Shop.jsx'
import Cart from './Cart.jsx'
import IndividualProduct from "./IndividualProduct.jsx"

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
  const handleAdd = (clickNum, productID, quanNum) => {
    // Then we check if this product id is already in the array, if it is, we increase it's quantity.
    let x = addedItems.findIndex(e => e.id === productID)
    if (x > -1) {
      // Calls quantity change function, 
      handleQuantity(x, 'add', quanNum)
    }

    // If it's not we add it to the array
    else {
      //Selecting the current product element
      let newEle = products[clickNum];
      //Setting the quantity of the element
      newEle.quantity = quanNum;
      //Writing the current array + adding the new object
      let newObj = [...addedItems, newEle]
      SetAddedItems(newObj)
    }
  }

const handleQuantity = (id, act, quanNum) => {
  const curArr = [...addedItems]
  //Checks if we should add or substract from the quantity number
  if(act === "add"){
    //If there is writen number in the quantity input field, sets it to the quantity number
    if(quanNum){
      curArr[id].quantity += quanNum
    }
    //Plus one quantity (used for the increase button in the cart)
    else{
      curArr[id].quantity += 1
    }
  }
  //Substract uqantity
  else if (act === "sub"){
    curArr[id].quantity -= 1
    //Checks if quantity is 0, then removes the whole product from the cart
    if (curArr[id].quantity == 0){
      curArr.splice([id], 1)
    }
  }
    SetAddedItems(curArr)
}

//Function for removing the product from the car, by the remove button
const handleRemove = (id) => {
  const curArr = [...addedItems];
  curArr.splice([id], 1);
  SetAddedItems(curArr);
}

let product64 = products
console.log(products)

  return (
    <>
      {/* Header */}
      <div className='header'>
        <img src={reactImg}></img>
        <div>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/cart">Cart</Link>
          <p className='CartIcon' onClick={handleCart}>CART ICON</p>
          {cartModal ? <div className='cartWrapper'>
            {addedItems.map((product, i) => <div key={i}> <h1>{product.title}</h1>
              <img src={product.image} width={100} height={100}></img>
              <p>{product.description}</p>
              <h3>{product.price}</h3>
              <p>{product.quantity}</p>
              <button onClick={() => handleQuantity(i, "add")}>Add</button>
              <button onClick={() => handleQuantity(i, "sub")}>Substract</button>
              <button onClick={() => handleRemove(i)}>Remove</button>
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
          <Route path="/cart" element={<Cart handleQuan={handleQuantity} handleRem={handleRemove} addedItems={addedItems} />} />
         { products && <>
         <Route path="/shop/wd-2tb" element={<IndividualProduct handleAdding={handleAdd} products={products[0]} id={0} />} />
         <Route path="/shop/ssd-1tb" element={<IndividualProduct handleAdding={handleAdd} products={products[1]} id={1} />} />
         <Route path="/shop/ssd-256gb" element={<IndividualProduct handleAdding={handleAdd} products={products[2]} id={2} />} />
         <Route path="/shop/wd-4tb" element={<IndividualProduct handleAdding={handleAdd} products={products[3]} id={3} />} />
         <Route path="/shop/acer-21.5inch" element={<IndividualProduct handleAdding={handleAdd} products={products[4]} id={4} />} />
         <Route path="/shop/Samsung-49inch" element={<IndividualProduct handleAdding={handleAdd} products={products[5]} id={5} />} />
         </>
         }
        </Routes>
      </div>

    </>
  )
}

export default App
