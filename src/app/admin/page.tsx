"use client";
import React, { useState } from "react";
import Image from "next/image";
import assets from "@/assets/upload_area.png";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/CustomFormField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import SubmitButton from "@/components/shared/SubmitButton";
import { addProductSchema } from "@/lib/schemas";
import { z } from "zod";
import { useDataContext } from "@/context/DataContext";

const Admin = () => {
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: "",
      title: "",
      price: "",
    },
  });

  const { addProduct } = useDataContext();


  const handlesubmit = async (data: z.infer<typeof addProductSchema>) => {
    try {
      const formData = new FormData();
  
      // Append form values
      formData.append("name", data.name);
      formData.append("title", data.title);
      formData.append("price", data.price);
  
      // Append image file if it exists
      if (files[0]) {
        formData.append("image", files[0]); // name must match your backend field
      }
  
      await addProduct(formData); // now we're passing FormData
      form.reset();
      setFiles([]);
    } catch (error) {
      console.error("Submission Error:", error);
    }
  };
  
  

  return (
    <div className="px-6 py-8">
      <div>
        <h2 className="text-md font-medium">Product Image</h2>
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
              width={200}
              height={200}
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(handlesubmit)} className="space-y-4 mt-4">
          <div className="flex gap-4 ">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="name"
              label="Name"
              placeholder="Enter Product Name"
              variant="h-[40px] w-full lg:w-[350px]"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="title"
              label="Description"
              placeholder="Enter Product Description"
              variant="h-[40px] w-full lg:w-[350px]"
            />
          </div>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="price"
            label="Price"
            placeholder="Enter Product Price"
            variant="h-[40px] w-full"
          />

          <SubmitButton
            loadingText="Verifying OTP..."
            className="w-full h-[50px] mt-6 bg-mainBlue"
          >
            Submit
          </SubmitButton>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Admin;
