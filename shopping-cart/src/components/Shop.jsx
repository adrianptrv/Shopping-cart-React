import { useState } from 'react'

// Getting the callback for adding products to cart, and the porducts arry
function Shop({ handleAdding, products }) {

//Quantity variable, used fo the quantity input field
const [num, SetNum] = useState([1, 1, 1, 1, 1, 1])

//Change quntity number in the input field 
const handleChange = (e, i, act) => {
  let num1 = num;
  if(act === "add"){
    num1[i] += parseInt(1)
  }
  else if (act === "sub"){
    num1[i] -= parseInt(1)
  }
  else{
    num1[i] = parseInt(e.target.value)
  }
  SetNum([...num1]);
}

    return (
        <>
            <h1>
                SHOP PAGE

            </h1>
            {/* Showing all of the fetched products by mapping the products array  */}
            {products && products.map((product, i) => <div key={i}> <h1>{product.title}</h1>
                <img src={product.image} width={100} height={100}></img>
                <p>{product.description}</p>
                <h3>${product.price}</h3>
                <p>{product.id}</p>
                <input type='number' min={1} value={num[i]} onChange={(e) => {handleChange(e, i)}}></input>
                 <button onClick={() => {handleChange(null, i, "add")}}>Plus</button>
                 <button onClick={() => {handleChange(null, i, "sub")}}>Minus</button>
                <button onClick={() => handleAdding(i, product.id, num[i])}>Add to cart</button>
                </div>)}
            <div>

                
            </div>
        </>
    )
}

export default Shop
