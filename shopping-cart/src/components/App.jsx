import React from 'react'
import { useState, useEffect } from 'react'
import reactImg from '../assets/electronics-logo.png'
import { Route, Routes, Link } from 'react-router-dom';

//Pages
import Home from './Home.jsx'
import Shop from './Shop.jsx'
import Cart from './Cart.jsx'
import IndividualProduct from "./IndividualProduct.jsx"

//Styles
import "../styles/App.scss"

//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'


function App() {
  // Variable for holding the fetched products
  const [products, SetProducts] = useState()

  // Added to cart variable
  const [addedItems, SetAddedItems] = useState([])

  // Variable for the total price of the items
  const [totalPrice, SetTotalPrice] = useState(0)

  // Change modal change variable
  const [cartModal, SetCartModal] = useState(false)

  // Object holding the individual product link, so we can make the items from our cart lead to the individual product pages
  const pageObj = {
    9: "/shop/wd-2tb",
    10: "/shop/ssd-1tb",
    11: "/shop/ssd-256gb",
    12: "/shop/wd-4tb", 
    13: "/shop/acer-21.5inch",
    14: "/shop/Samsung-49inch"
  }

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
  const handleAdd = (clickNum, productID, quanNum, price) => {
    // Then we check if this product id is already in the array, if it is, we increase it's quantity.
    let x = addedItems.findIndex(e => e.id === productID)
    if (x > -1) {
      // Calls quantity change function, with the product array position in "addedItems; The action we want to make - "add" or "sub"; And the quantity Number"
      handleQuantity(x, 'add', price, quanNum)
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
    let total = totalPrice + (quanNum * price)
    SetTotalPrice(total)
  }

  const handleQuantity = (id, act, price, quanNum) => {
    const curArr = [...addedItems]
    //Checks if we should add or substract from the quantity number
    if (act === "add") {
      //If there is writen number in the quantity input field, sets it to the quantity number
      if (quanNum) {
        curArr[id].quantity += quanNum
      }
      //Plus one on quantity and price (used for the increase button in the cart)
      else {
        curArr[id].quantity += 1
        let total = totalPrice + price
        SetTotalPrice(total)
      }
    }
    //Substract quantity and price by one
    else if (act === "sub") {
      curArr[id].quantity -= 1
      let total = totalPrice - price
      SetTotalPrice(total)
      //Checks if quantity is 0, then removes the whole product from the cart
      if (curArr[id].quantity == 0) {
        curArr.splice([id], 1)
      }
    }
    SetAddedItems(curArr)
  }

  //Function for removing the product from the cart, by the remove button. Also substract the value of the items (qunatity * price) from the total bill.
  const handleRemove = (id, quantity, price) => {
    const curArr = [...addedItems];
    curArr.splice([id], 1);
    SetAddedItems(curArr);

    let total = totalPrice - (quantity * price);
    SetTotalPrice(total)
  }


  return (
    <>
      {/* Header */}
      <div className='header'>
        <img className='headerLogo' src={reactImg}></img>
        <div className='linkPlusCart'>
          {/* Links to the three main pages + cart Icon */}
          <a className='linkHome'><Link to="/">Home</Link></a>
          <a className='linkShop'><Link to="/shop">Shop</Link></a>
          <a className='linkCart'><Link to="/cart">Cart</Link></a>
          <p className='cartIcon' onClick={handleCart}><FontAwesomeIcon icon={faCartShopping}/></p>
          {/* Cart code. 
              1st - We check if the cart should be showing or not.
              2nd - If it's set to enabled we map the array with the added items - "addedItems" so we can show them in the cart div  */}
          {cartModal ? <div className='cartWrapper'>
            {addedItems.map((product, i) => <div key={i}> <h1>{product.title}</h1>
              <img src={product.image} width={100} height={100}></img>
              <p>{product.description}</p>
              <h3>${product.price}</h3>
              <p>{product.quantity}</p>
              <button><Link to={pageObj[product.id]}>Go to page</Link></button>
              {/* Buttons for increasing and decreasing the quantity of the added to cart products. The are calling the "handleQuantity function with the specific action, "add" or "sub" */}
              <button onClick={() => handleQuantity(i, "add", product.price)}>Add</button>
              <button onClick={() => handleQuantity(i, "sub", product.price)}>Substract</button>
              {/* Button for removing the specific product from the cart with the product index position in the "addedItems" array */}
              <button onClick={() => handleRemove(i, product.quantity, product.price)}>Remove</button>
            </div>)}
            {/* Checkout button *FOR FUTURE UPDATES* */}
            <button>Proceed to Checkout</button>
            {/* Link for the cart page where is user can see his whole cart on the page. */}
            <button onClick={handleCart}><Link to="/cart">View Cart</Link></button>
            <br></br>
            <h2>${totalPrice}</h2>
          </div> : <></>}
        </div>
      </div>

      {/* Page content */}
      <div>
        <Routes>
          {/* Adding the three main pages */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop handleAdding={handleAdd} products={products} />} />
          <Route path="/cart" element={<Cart handleQuan={handleQuantity} handleRem={handleRemove} addedItems={addedItems} totalCartPrice={totalPrice} pageObj={pageObj} />} />
          {/* Adding individual pages for the products. 
              1st - We check if the products variable has the results of the fetching
              2nd - We write the Route component for every product. 
               - We are sending the function for adding product to the Cart - "handleAdd" as a callback.
               - Only the specific product information, based on their place in the result array - "products"
               - And the id/position of the product in the result array - "products"*/}
          {products && <>
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
