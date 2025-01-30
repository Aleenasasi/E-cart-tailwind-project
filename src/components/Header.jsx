import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchProduct } from '../redux/slices/productSlice'


const Header = ({insideHome}) => {
  const dispatch = useDispatch()
  const userCart = useSelector(state=>state.cartReducer)
  const userWishlist=useSelector(state=>state.wishlistReducer)
  return (
    <nav className='flex bg-violet-600 fixed w-full p-5 text-white'>
      <Link className='text-2xl font-bold' to={'/'}>
        <i className='fa-solid fa-truck-fast me-2'></i> Daily cart
      </Link>
      <ul className='flex-1 text-right'>
        {
          insideHome &&  <li className='list-none inline-block px=5'> <input onChange={e=>dispatch(searchProduct(e.target.value.toLowerCase()))} style={{width:'300px'}} className='rounded p-2 text-black' type="text" placeholder='Search products Here!!' /></li>

        }
      <Link to={'/wishlist'}><li className='list-none inline-block px-5'> <i className='fa-solid fa-heart text-red-600'></i>Wishlist <span className='bg-black text-white rounded  p-1 '>{userWishlist?.length}</span></li></Link>
           <Link to={'/cart'}><li className='list-none inline-block px-5'> <i className='fa-solid  fa-cart-plus text-green-600'></i>Cart <span className='bg-black text-white rounded p-1'>{userCart?.length}</span></li></Link>
      </ul>

    </nav>
  )
}

export default Header

