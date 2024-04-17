import { useState } from 'react'



function Shop({ handleAdding, products }) {



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
                <button onClick={() => handleAdding(i)}>Add to cart</button>
                </div>)}
            <div>

                
            </div>
        </>
    )
}

export default Shop
