// "use client"
// import React from 'react'
// import { useDataContext } from "@/context/DataContext";
// import Loading from '@/components/Loading';
// import Image from 'next/image';

// const Order = () => {
//      const { orderProducts, loadingOrders } = useDataContext();
//      console.log('orderProducts', orderProducts)

//   return (
//     <section className='px-6 py-8'>
//        <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen">
//         <div className="space-y-5">
//           <h2 className="text-lg font-medium mt-6">My Orders</h2>
//           {loadingOrders ? (
//             <Loading/>
//           ) : (
//             <div className="max-w-5xl border-t border-gray-300 text-sm">
//               {orderProducts.map((order, index) => (
//                 <div
//                   key={index}
//                   className="flex flex-col md:flex-row gap-5 justify-between p-5 border-b border-gray-300"
//                 >
//                   <div className="flex-1 flex gap-5 max-w-80">
//                     <Image
//                       className="max-w-16 max-h-16 object-cover"
//                       src={order.producs.imageUrl}
//                       alt="box_icon"
//                     />
//                     <p className="flex flex-col gap-3">
//                       <span className="font-medium text-base">
//                         {order.items
//                           .map(
//                             (item) => item.product.name + ` x ${item.quantity}`
//                           )
//                           .join(", ")}
//                       </span>
//                       <span>Items : {order.items.length}</span>
//                     </p>
//                   </div>
//                   <div>
//                     <p>
//                       <span className="font-medium">
//                         {order.address.fullName}
//                       </span>
//                       <br />
//                       <span>{order.address.area}</span>
//                       <br />
//                       <span>{`${order.address.city}, ${order.address.state}`}</span>
//                       <br />
//                       <span>{order.address.phoneNumber}</span>
//                     </p>
//                   </div>
//                   <p className="font-medium my-auto">
//                     {currency}
//                     {order.amount}
//                   </p>
//                   <div>
//                     <p className="flex flex-col">
//                       <span>Method : COD</span>
//                       <span>
//                         Date : {new Date(order.date).toLocaleDateString()}
//                       </span>
//                       <span>Payment : Pending</span>
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Order




"use client";
import React from 'react';
import { useDataContext } from "@/context/DataContext";
import Loading from '@/components/Loading';
import Image from 'next/image';

const Order = () => {
  const { orderProducts, loadingOrders } = useDataContext();
  console.log('orderProducts', orderProducts);

  return (
    <section className=''>
      <div className="flex flex-col justify-between px-6 md:px-16 py-6 min-h-screen">
        <div className="space-y-5">
          <h2 className="text-lg font-medium mt-6">My Orders</h2>
          {loadingOrders ? (
            <Loading />
          ) : (
            <div className="max-w-5xl border-t border-gray-300 text-sm">
              {orderProducts.map((order, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row gap-5 justify-between p-5 border-b border-gray-300"
                >
                  {/* Products Preview */}
                  <div className="flex-1 flex gap-5 max-w-80">
                    <Image
                      className="max-w-16 max-h-16 object-cover"
                      src={order.products[0]?.imageUrl || "/placeholder.jpg"}
                      alt="product"
                      width={64}
                      height={64}
                    />
                    <div className="flex flex-col gap-3">
                      <span className="font-medium text-base">
                        {order.products
                          .map((item: any) => `${item.name} x ${item.quantity}`)
                          .join(", ")}
                      </span>
                      <span>Items: {order.products.length}</span>
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex flex-col justify-center">
                    <p className="font-medium">{order.userEmail}</p>
                    <p>Order ID: {order.id}</p>
                  </div>

                  {/* Amount */}
                  <p className="font-medium my-auto">${order.totalAmount.toFixed(2)}</p>

                  {/* Payment Info */}
                  <div className="flex flex-col justify-center">
                    {/* <span>Payment: {order.paymentStatus}</span> */}
                    {/* <span>Intent ID: {order.stripePaymentIntentId}</span> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Order;

