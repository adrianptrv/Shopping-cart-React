import { useState } from 'react'
import {Link } from 'react-router-dom';

import "../styles/IndividualProduct.scss"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

function Shop({ handleAdding, products, id }) {

//Quantity variable
const [num, SetNum] = useState([1, 1, 1, 1, 1, 1])

const handleChange = (e, i, act) => {
  let num1 = num;
  if(act === "add"){
    num1[i] += parseInt(1)
  }
  else if (act === "sub"){
    if (num1[i] == 1) {
      return;
    }
    else {
      num1[i] -= parseInt(1)
    }
  }
  else{
    num1[i] = parseInt(e.target.value)
  }
  SetNum([...num1]);
  console.log(num)
}

    return (
        <>
            <div>
            {products && <div key={id} className='indWrapper'> 
              <div className='imgHolder'> 
                <img className='indProduct' src={products.image} width={100} height={100}></img>
                </div>
                <div className='indInfo'>
                <h1>{products.title}</h1>
                <p>{products.description}</p>
                <h3>${products.price}</h3>
                <div className='indQuan'>
                <p className='quanText'>Quantity:</p>
                <button className='btnQuan' onClick={() => {handleChange(null, id, "sub")}}><FontAwesomeIcon icon={faMinus} /></button>
                <input  type='number' min={1} value={num[id]} onChange={(e) => {handleChange(e, id)}}></input>
                <button className='btnQuan' onClick={() => {handleChange(null, id, "add")}}><FontAwesomeIcon icon={faPlus} /></button>
                </div>
                <div className='indNav'>
                <button  onClick={() => handleAdding(id, products.id, num[id], products.price)}>Add to cart</button>
                <button><Link to="/Shopping-cart-React/cart">View Cart</Link></button>
                <button><Link to="/Shopping-cart-React/shop">Back to Shop</Link></button>
                </div>
                </div>
           
                </div>}
                
            </div>
        </>
    )
}

export default Shop
