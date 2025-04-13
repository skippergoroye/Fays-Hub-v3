"use client"
import React from 'react'
import Loading from '@/components/Loading'
import { useDataContext } from '@/context/DataContext'
import Image from 'next/image'
import { useRouter } from 'next/navigation';


const ProductList = () => {
  const router = useRouter(); 
  const { products, loading, deleteProduct } = useDataContext()


  
  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
    {loading ? <Loading /> : <div className="w-full md:p-10 p-4">
      <h2 className="pb-4 text-lg font-medium">All Product</h2>
      <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
        <table className=" table-fixed w-full overflow-hidden">
          <thead className="text-gray-900 text-sm text-left">
            <tr>
              <th className="w-2/3 md:w-2/5 px-4 py-3 font-medium truncate">Product</th>
              <th className="px-4 py-3 font-medium truncate max-sm:hidden">Name</th>
              <th className="px-4 py-3 font-medium truncate">
                Price
              </th>
              <th className="px-4 py-3 font-medium truncate max-sm:hidden">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-500">
            {products.map((product, index) => (
              <tr key={index} className="border-t border-gray-500/20">
                <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                  <div className="bg-gray-500/10 rounded p-2">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-16"
                      width={1280}
                      height={720}
                    />
                  </div>
                  <span className="truncate w-full">
                    {product.name}
                  </span>
                </td>
                <td className="px-4 py-3 max-sm:hidden">{product.name}</td>
                <td className="px-4 py-3">${product.price}</td>
                <td className="px-4 py-3 max-sm:hidden">
                  <button onClick={() => deleteProduct(product.id)} className="flex items-center gap-1 px-1.5 md:px-3.5 py-2 bg-red-600 text-white rounded-md">
                    <span className="hidden md:block">Delete</span>
                   
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>}
  </div>
  )
}

export default ProductList