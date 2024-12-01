import React, { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'

export default function ShowProduct() {

  const [productData , setProductData] = useState([])

    useEffect(()=>{

        var apiPathForProduct = process.env.REACT_APP_NODEAPI + 'product'

        fetch(apiPathForProduct)
        .then(res=>res.json())
        .then(value=>{
            console.log(value)
            console.log(value.data)
            setProductData(value.data)
        })
    },[])
  return (
    <>
    <AdminMenu/>

    <div>
            <h1>ALL PRODUCTS</h1>
            <div className="product-container">
                {productData.map(({productImg, productName, productPrice, _id}) => (
                    <div className="product-card" key={_id}>
                        <img
                            src={productImg}
                            alt={productName}
                        />
                        <h2>{productName}</h2>
                        <p>PRICE: {productPrice}</p>
                    </div>
                ))}
            </div>
        </div>
        </>
  )
}
