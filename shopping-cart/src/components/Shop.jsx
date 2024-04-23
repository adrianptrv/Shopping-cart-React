import { useState } from 'react'

function Shop({ handleAdding, products }) {

//Quantity variable
const [num, SetNum] = useState([1, 1, 1, 1, 1, 1])

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
  console.log(num)
}

    return (
        <>
            <h1>
                SHOP PAGE

            </h1>
            {products && products.map((product, i) => <div key={i}> <h1>{product.title}</h1>
                <img src={product.image} width={100} height={100}></img>
                <p>{product.description}</p>
                <h3>{product.price}</h3>
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
