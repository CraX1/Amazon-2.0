import React from 'react'
import Product from './Product'

const ProductFeed = ({ products }) => {
    return (
        <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-32 lg:-mt-52 mx-auto'>

            {products.slice(1, 4).map((product) =>
                <Product
                    id={product.id}
                    key={product.id}
                    productDetails={product}
                />
            )}
            <img className='md:col-span-full' src="https://links.papareact.com/dyz" alt="" />
            <div className='md:col-span-2'>
                {products.slice(4, 5).map((product) =>
                    <Product
                        id={product.id}
                        key={product.id}
                        productDetails={product}
                    />
                )}
            </div>
            {products.slice(5, 13).map((product) =>
                <Product
                    id={product.id}
                    key={product.id}
                    productDetails={product}
                />
            )}
            <div className='md:col-span-3'>
                {products.slice(13, 14).map((product) =>
                    <Product
                        id={product.id}
                        key={product.id}
                        productDetails={product}
                    />
                )}
            </div>
            {products.slice(14, products.length).map((product) =>
                <Product
                    id={product.id}
                    key={product.id}
                    productDetails={product}
                />
            )}
        </div >
    )
}

export default ProductFeed