"use client"

import React from 'react'
import { useParams } from 'next/navigation'
import getsingleProduct from '@/lib/get-singleProduct';
import Image from 'next/image';
import { useRouter } from 'next/navigation'



type IParams = {
  params: {
    id: number;
  };
};

export default async function SingleProduct({ params: {id} }: IParams) {
  // const {id}  = useParams()
  const router = useRouter()
  const product = await getsingleProduct(id)

  console.log(product)
  return (
  
      
      <div className="flex  flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="mb-4 flex items-center justify-center">
          <button onClick={() => router.push("/")} className="text-center cursor-pointer bg-green-500 w-40 p-2 rounded-lg text-white hover:bg-green-800">Back To Home</button>
        </div>
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl w-full text-center">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{product.name}</h1>
      {product.description && <p className="text-gray-600 mb-4">{product.description}</p>}
      <p className="text-gray-800 mb-2"><strong>Unique ID:</strong> {product.unique_id}</p>
      <p className="text-gray-800 mb-2"><strong>Availability:</strong> {product.is_available ? 'Available' : 'Unavailable'}</p>
      {product.photos.length > 0 && (
        <div className="flex justify-center mb-4">
          {product.photos.map((photo: { filename: React.Key | null | undefined; url: any; }) => (
            <Image
              key={photo.filename}
              src={`https://api.timbu.cloud/images/${photo.url}`}
             
              alt="Product Image"
              width={100}
              height={100}
            />
          ))}
        </div>
      )}
      {product.current_price && (
        <p className="text-xl font-semibold text-pink-500 mb-4"><strong>Price:</strong> ${product.current_price}</p>
      )}
      <p className="text-gray-800"><strong>Available Quantity:</strong> {product.available_quantity}</p>
    </div>
  </div>


    
  )
}
