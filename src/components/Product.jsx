import Image from 'next/image'
import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../slices/basketSlice';
const MAX_RATING = 5;
const MIN_RATING = 1;
const DynamicStarIcon = dynamic(() => import('../svg/StarIcon'), {
    ssr: false, // Set ssr to false to enable client-side rendering
});
const Product = ({ productDetails }) => {
    const dispatch = useDispatch();
    const { id, title, price, category, description, image } = productDetails
    const [rating, setRating] = useState(Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING);
    const [hasPrime] = useState(Math.random() < 0.5);

    const addToBasketHandler = () => {
        const items = {
            id, title, price, category, description, image, rating, hasPrime
        }
        dispatch(addToBasket(items))
    }

    return (
        <div className='relative flex flex-col m-5 bg-white p-10 z-30'>
            <p className='absolute right-2 top-2 text-xs italic text-gray-400'>
                {category}
            </p>
            <Image src={image} width={200} height={200} objectFit='contain' />

            <h4 className='my-3'>{title}</h4>

            <div className='flex'>
                {Array.from({ length: rating }, (_, i) => (
                    <DynamicStarIcon key={i} />
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
            <button className='mt-auto button' onClick={addToBasketHandler}>Add to Basket</button>
        </div>
    )
}

export default Product