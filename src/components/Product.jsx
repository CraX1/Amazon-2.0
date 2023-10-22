import Image from 'next/image'
import React, { useState } from 'react'
import StarIcon from '../svg/StarIcon'
import Currency from 'react-currency-formatter';
const MAX_RATING = 5;
const MIN_RATING = 1;
const Product = ({ productDetails }) => {
    const { title, price, category, description, image } = productDetails
    const [rating, setRating] = useState(Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING);
    const [hasPrime] = useState(Math.random() < 0.5);

    return (
        <div className='relative flex flex-col m-5 bg-white p-10 z-30'>
            <p className='absolute right-2 top-2 text-xs italic text-gray-400'>
                {category}
            </p>
            <Image src={image} width={200} height={200} objectFit='contain' />

            <h4 className='my-3'>{title}</h4>

            <div className='flex'>
                {Array.from({ length: rating }, (_, i) => (
                    <StarIcon key={i} />
                ))}
            </div>


            <p className='text-xs my-2 line-clamp-2'>{description}</p>



            <div className='mb-5'>
                <Currency quantity={price} currency='INR' />
            </div>

            {/* {hasPrime && (
                <div className="flex items-center space-x-2 -mt-5">
                    <img className='w-12' src='https://links.papareact.com/fdw' alt="" />
                    <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                </div>
            )} */}
            <button className='mt-auto button'>Add to Basket</button>
        </div>
    )
}

export default Product