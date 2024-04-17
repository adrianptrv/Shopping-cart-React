import { useState, useEffect } from 'react'



function Cart() {

    let arr1;
    const [products, SetProducts] = useState()

  useEffect(() => {
  fetch('https://fakestoreapi.com/products/category/electronics')
            .then((response)=>response.json())
            .then((data) => {
            SetProducts(data)
            })

  }, [])

//   arr1 = products.map((product) =>  <div>{product.title}</div>)

  return (
   <>
<h1>
    CART PAGE
 
</h1>
{products && products.map((product) =>  <div>{product.title}</div>)}
   </>
  )
}

export default Cart
