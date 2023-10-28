import Image from "next/legacy/image";
import React from 'react'
import StarIcon from '../svg/StarIcon';
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { addToBasket, removeFromBasket } from '../slices/basketSlice';

const CheckoutItem = ({ item }) => {
    const { id, title, rating, price, image, description, cateory, hasPrime } = item;
    const dispatch = useDispatch();
    const addToBasketHandler = () => {
        dispatch(addToBasket(item))
    }
    const removeFromBasketHandler = () => {
        dispatch(removeFromBasket({ id }))
    }
    return (
        <div className="grid grid-cols-5">
            <Image src={image} height={200} width={200} objectFit='contain' />
            <div className='col-span-3 mx-5'>
                <p>{title}</p>
                <div className='flex'>
                    {Array.from({ length: rating }, (_, i) => (
                        <StarIcon key={i} />
                    ))}
                </div>
                <p className='text-xs my-2 line-clamp-3'>{description}</p>
                <Currency quantity={price} currency={'INR'} />

                {/* {hasPrime && (
                <div className="flex items-center space-x-2 -mt-5">
                    <img className='w-12' src='https://links.papareact.com/fdw' alt="" />
                    <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                </div>
                )} */}
            </div>

            <div className='flex flex-col space-y-2 my-auto justify-self-end'>
                <button className='button' onClick={addToBasketHandler}>Add to basket</button>
                <button className='button' onClick={removeFromBasketHandler}>Remove from basket</button>
            </div>
        </div>
    )
}

export default CheckoutItem