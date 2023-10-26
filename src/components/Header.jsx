import React from 'react'
import Image from 'next/image'
import SearchIcon from '../svg/SearchIcon'
import ShoppingCartIcon from '../svg/ShoppingCartIcon'
import MenuBarIcon from '../svg/MenuBarIcon'
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useSelector } from 'react-redux'
import { selectItems } from '../slices/basketSlice'

function Header() {
  const basketItems = useSelector(selectItems);
  const { data: session } = useSession()
  const router = useRouter();

  return (
    <header>
      {/* top nav */}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">

        <div className='mt-2 flex items-center flex-grow sm:flex-grow-0'>
          <Image onClick={() => router.push('/')} src='https://links.papareact.com/f90' width={150} height={40} objectFit='contain' className='cursor-pointer' />
        </div>

        {/* search */}
        <div className='hidden sm:flex items-center bg-yellow-400 hover:bg-yellow-500 h-10 flex-grow rounded-md cursor-pointer '>
          <input className='w-12 h-full flex-grow flex-shrink rounded-l-md p-2 px-4 focus:outline-none' type='text' />
          <div className='p-4'>
            <SearchIcon />
          </div>
        </div>

        {/* right nav Items */}
        <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
          <div className='link' onClick={session ? signOut : signIn}>
            <p>{session ? `Hello, ${session.user.name}` : "Sign In"}</p>
            <p className='font-extrabold md:text-sm'>Accounts & Lists</p>
          </div>
          <div className='link'>
            <p>Returns</p>
            <p className='font-extrabold md:text-sm'>& Orders</p>
          </div>
          <div className='relative link flex items-center' onClick={() => router.push('/checkout')}>
            <span className='absolute top-0 right-0 md:right-11 h-4 w-4 text-center bg-yellow-400 rounded-full text-black font-bold'>{basketItems.length}</span> {/* note 1*/}
            <ShoppingCartIcon />
            <p className='hidden md:flex font-extrabold md:text-sm mt-2'>Basket</p>
          </div>
        </div>
      </div>

      {/* bottom nav */}
      <div className='flex items-center space-x-3 p-2 pl-6 text-white text-sm bg-amazon_blue-light'>
        <p className='link flex items-center gap-1'>
          <MenuBarIcon />
          All
        </p>
        <p className='link'>Amazon Business</p>
        <p className='link'>Prime Video</p>
        <p className='link'>Today's Deals</p>
        <p className='link hidden md:inline-flex'>Electronics</p>
        <p className='link hidden md:inline-flex'>Food & Grocery</p>
        <p className='link hidden md:inline-flex'>Prime</p>
        <p className='link hidden md:inline-flex'>Buy Again</p>
        <p className='link hidden lg:inline-flex'>Shopper Toolkit</p>
        <p className='link hidden lg:inline-flex'>Health & Personal Care</p>
      </div>
    </header>
  )
}

export default Header


//note-1 => absolute positioning without parent being relative means it is absolute to the whole page
//       =>also we are giving right-0 initially for mobile and as soon as the screen size is md or higher then we give it 10 since the basket word will be there