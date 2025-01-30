import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { decrementQuantity, emptyCart, incrementQuantity, removeCartItem } from '../redux/slices/cartSlice'


const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userCart = useSelector(state=>state.cartReducer)
  const [cartTotal,setCartTotal]=useState(0)

  useEffect(()=>{
    if(userCart?.length){
      setCartTotal(userCart?.map(item=>item.totalPrice).reduce((a,b)=>a+b))
    }
  },[userCart])

   const handleDecrementQuantity = (product)=>{
    if(product?.quantity>1){
      dispatch(decrementQuantity(product.id))
    }else{
      dispatch(removeCartItem(product.id))
    }
   }

     const checkOut =()=>{
      dispatch(emptyCart())
      alert("Order confirmed ....Thank you!!!")
      // redirect to home
      navigate('/')
     }


  return (
    <>
     <Header/>
     <div style={{paddingTop:'100px'}} className='px-5'>
      {
        userCart?.length>0?
      <>
      <h1 className='text-5xl font-bold text-blue-600 '>Cart Summery...</h1>
      <div className='grid grid-cols-3 gap-4 mt-5'>
        <div className='col-span-2 border rounded p-5 shadow'>
          <table className='table-auto w-full'>
            <thead>
              <tr>
                <td className='font-semibold'>#</td>
                <td className='font-semibold'>Name</td>
                <td className='font-semibold'>Image</td>
                <td className='font-semibold'>Quantity</td>
                <td className='font-semibold'>Price</td>
                <td className='font-semibold'>...</td>

              </tr>
            </thead>
            <tbody>
              {
                userCart?.map((product,index)=>(
              <tr>
                <td>{index+1}</td>
                <td>{product?.title}</td>
                <td> <img width={'70px'} height={'70px'} src={product?.thumbnail} alt="" /></td>
                <td>
                  <div className='flex'>
                    <button onClick={()=>handleDecrementQuantity(product)} className='font-bold'>-</button>
                    <input style={{width:'40px'}} type="text" className='border rounded p-1 mx-2' value={product?.quantity} />
                    <button onClick={()=>dispatch(incrementQuantity(product?.id))} className='font-bold'>+</button>
                  </div>

                </td>
                <td>${product?.totalPrice}</td>
                <td> <button onClick={()=>dispatch(removeCartItem(product?.id))} className='text-red-500'> <i className='fa-solid fa-trash'></i></button></td>
              </tr>
                ))
              }

            </tbody>
          </table>
          <div className='float-right mt-5'>
            <button onClick={()=>dispatch(emptyCart())} className='bg-red-600 rounded p-2 text-white'>Empty Cart</button>
            <Link to={'/'} className="bg-blue-500 ms-3 rounded p-2 text-white">Shop More</Link>
          </div>
        </div>
        <div className='col-span-1'>
          <div className='border rounded shadow p-5'>
            <h2 className='text-2xl font-bold '>Total Amount: <span className='text-red-600'>$340</span></h2>
            <hr />
            <button onClick={checkOut} className='bg-green-700 rounded p-2 text-white w-full mt-4'>Check Out</button>
          </div>
        </div>
      </div>
      </>
      :

      <div className='flex justify-center items-center h-screen'>
        <img className='w-100 h-1/2' src="https://assets-v2.lottiefiles.com/a/6102a4f8-1176-11ee-bcc5-236dd7d5f88b/aK8IKRE5a3.gif" alt="" />
        <h1 className='text-3xl text-red-600'>Your cart is empty!!!</h1>
      </div>
      }
     </div>
    </>
  )
}

export default Cart