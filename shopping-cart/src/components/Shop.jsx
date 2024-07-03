import { useState } from 'react'
import { Link } from 'react-router-dom';
import "../styles/Shop.scss"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

// Getting the callback for adding products to cart, and the porducts arry
function Shop({ handleAdding, products, pageObj }) {

  //Quantity variable, used fo the quantity input field
  const [num, SetNum] = useState([1, 1, 1, 1, 1, 1])

  //Change quntity number in the input field 
  const handleChange = (e, i, act) => {
    let num1 = num;
    if (act === "add") {
      num1[i] += parseInt(1)
    }
    else if (act === "sub") {
      // Check is the number in the input field is 1, do nothing. So we don't have a negative number of items added.
      if (num1[i] == 1) {
        return;
      }
      else {
        num1[i] -= parseInt(1)
      }
    }
    else {
      num1[i] = parseInt(e.target.value)
    }
    SetNum([...num1]);
  }

  return (
    <>
      <div className='productWrapper'>
        {/* Showing all of the fetched products by mapping the products array. We first check if the array is true. */}
        {products && products.map((product, i) => <div className='productBox' key={i}>
        <Link to={pageObj[product.id]}><img src={product.image} width={100} height={100}></img></Link>
          <h1>{product.title}</h1>
          <h3>${product.price}</h3>
          <div>
          <div className='quanWrap'>
          <button className='btnQuan' onClick={() => { handleChange(null, i, "sub") }}><FontAwesomeIcon icon={faMinus} /></button>
          <input type='number' min={1} value={num[i]} onChange={(e) => { handleChange(e, i) }}></input>
          <button className='btnQuan' onClick={() => { handleChange(null, i, "add") }}><FontAwesomeIcon icon={faPlus} /></button>
          </div>
          <button className='btnAdd' onClick={() => handleAdding(i, product.id, num[i], product.price)}>Add to cart</button>
          </div>
        </div>)}
      </div>
    </>
  )
}

export default Shop
