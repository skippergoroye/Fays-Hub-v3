"use client"
import Image from "next/image";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../../redux/features/cart/cartSlice";
import Link from "next/link";
import { Footer, Navbar } from "@/components";
import { X } from "lucide-react";
import { useCartContext } from "@/context/cartContext";

const CartPage = () => {
  const { cartItems, removeItem } = useCartContext()



  console.log(cartItems)

  return (
    <section>
       <div className="px-6 lg:px-16">
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between mb-4 border-b pb-4">
                <Image src={item?.imageUrl} alt={item.name ?? ""} width={100} height={100} />
                <div>
                  <p className="mb-2 font-bold">Product Name</p>
                  <p>{item.name}</p>
                </div>
                <div className="flex items-center gap-40">
                  <div className="flex flex-col mr-4">
                    <p className="mb-2 font-bold">Quantity</p>
                    <div className="flex items-center border border-[#D9D9D9] p-1 rounded-lg">
                      <button onClick={() => dispatch(decrementQuantity(item.id))} className="px-2">-</button>
                      <p className="px-2">{item.quantity}</p>
                      <button onClick={() => dispatch(incrementQuantity(item.id))} className="px-2">+</button>
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 font-bold">Price</p>
                    <p>{item.current_price?.[0]?.USD?.[0] || 'N/A'}</p>
                  </div>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-red-500">
                  <X />
                </button>
              </div>
            ))}
            <Link href="/checkout">
              <button className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded">Proceed to Checkout</button>
            </Link>
          </div>
        )}
      </div>
    </div>
      <Footer />

    </section>
   
  );
};

export default CartPage;



