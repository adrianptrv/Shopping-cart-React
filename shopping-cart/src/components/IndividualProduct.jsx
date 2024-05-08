import { useState } from 'react'
import { Route, Routes, Link } from 'react-router-dom';


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
            <h1>
              LALALALA 64646464

            </h1>

            <div>
            {products && <div key={id}> <h1>{products.title}</h1>
                <img src={products.image} width={100} height={100}></img>
                <p>{products.description}</p>
                <h3>${products.price}</h3>
                <p>{products.id}</p>
                <input type='number' min={1} value={num[id]} onChange={(e) => {handleChange(e, id)}}></input>
                <button onClick={() => {handleChange(null, id, "add")}}>Plus</button>
                <button onClick={() => {handleChange(null, id, "sub")}}>Minus</button>
                <button onClick={() => handleAdding(id, products.id, num[id], products.price)}>Add to cart</button>
                <button><Link to="/shop">Back to Shop</Link></button>
                <button><Link to="/cart">To Cart</Link></button>
                </div>}
                
            </div>
        </>
    )
}

export default Shop
