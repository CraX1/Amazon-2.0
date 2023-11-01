import React from 'react'
import Header from '../components/Header'
import Image from "next/legacy/image"
import CheckoutItem from '../components/CheckoutItem'
import { useSelector } from 'react-redux'
import { selectItems, seletedItemsTotal } from '../slices/basketSlice'
import Currency from 'react-currency-formatter';
import { useSession } from 'next-auth/react'
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios'
const Checkout = () => {
    const { data: session } = useSession();
    const basketItems = useSelector(selectItems);
    const totalPriceOfBasket = useSelector(seletedItemsTotal)
    const stripePromise = loadStripe(process.env.stripe_public_key)

    const createCheckoutSession = async () => {
        const stripe = await stripePromise;

        //call backend to creat checkout session
        const checkoutSession = await axios.post('/api/checkout_session', { basketItems: basketItems, email: session.user.email })

        //redirect use/customer to stripe checkout
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id
        })

        if (result.error) {
            alert(result.error.message)
        }
    }
    return (
        <div className='bg-gray-100'>
            <Header />
            <main className='lg:flex max-w-screen-2xl mx-auto'>
                {/* left section */}
                <div className='flex-grow m-5 shadow-sm'>
                    <Image src="https://links.papareact.com/ikj" width={1020} height={250} objectFit='contain' />
                    <div className='flex flex-col p-5 space-y-10 bg-white'>
                        <h1 className='text-3xl border-b pb-4'>{basketItems.length > 0 ? "Your Shopping Basket" : "Your Shopping Basket is Empty"}</h1>
                        {basketItems.map((item, i) => <CheckoutItem key={i} item={item} />)}
                    </div>
                </div>

                {/* right section */}
                <div className='flex flex-col bg-white p-10'>
                    {basketItems.length > 0 && (
                        <>
                            <h2 className='whitespace-nowrap'>
                                Subtotal ({basketItems.length} items):
                                <span className=' font-bold'> <Currency quantity={totalPriceOfBasket} currency="INR" /></span>
                            </h2>

                            <button onClick={createCheckoutSession} role='link' className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                                {!session ? "Sign in to checkout" : "Proced to checkout"}
                            </button>
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Checkout