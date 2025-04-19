"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import assets from '@/assets/upload_area.png';


const Admin = () => {
  const [files, setFiles] = useState<File[]>([]); 
  




  return (
 <div className='px-6 py-8'>
  <div className="flex items-center gap-3 mt-2">
  <label htmlFor="imageUpload">
    <input
      onChange={(e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
          setFiles([selectedFile]);
        }
      }}
      type="file"
      id="imageUpload"
      hidden
      accept="image/*"
    />
    <Image
      className="max-w-24 cursor-pointer"
      src={files[0] ? URL.createObjectURL(files[0]) : assets}
      alt="Upload"
      width={100}
      height={100}
    />
  </label>
</div>

 </div>
  )
}

export default Admin
