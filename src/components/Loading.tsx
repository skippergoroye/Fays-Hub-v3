import React from 'react'
import Image from "next/image";

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-[70vh] relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-t-blue-500 border-gray-200" />
            <div className="absolute">
                <Image
                    src="/svg/fays-hub.svg"
                    alt="fay-hub"
                    width={60}
                    height={60}
                />
            </div>
        </div>
    )
}

export default Loading;

