import React from 'react'

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { assets } from '@/assets/assets';

const Sidebar = () => {
  const pathname = usePathname()
  const menuItems = [
      { name: 'Product List', path: '/admin/product-list', icon: assets.product_list_icon },
      { name: 'Add Product', path: '/admin', icon: assets.add_icon },

  ];


  return (
    <div className='md:w-64 w-16 border-r min-h-screen text-base border-gray-300 py-2 flex flex-col'>
            {menuItems.map((item) => {

                const isActive = pathname === item.path;

                return (
                    <Link href={item.path} key={item.name} passHref>
                        <div
                            className={
                                `flex items-center py-3 px-4 gap-3 ${isActive
                                    ? "border-r-4 md:border-r-[6px] bg-blue-600/10 border-blue-500/90"
                                    : "hover:bg-gray-100/90 border-white"
                                }`
                            }
                        >
                            <Image
                                src={item.icon}
                                alt={`${item.name.toLowerCase()}_icon`}
                                className="w-7 h-7"
                            />
                            <p className='md:block hidden text-center'>{item.name}</p>
                        </div>
                    </Link>
                );
            })}
        </div>
  )
}

export default Sidebar
