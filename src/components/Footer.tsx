import { footerLinks } from "@/constants";
import { Section } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="px-6 lg:px-16 py-12 bg-[#0029FF]">
      <div className="flex justify-between items-start gap-20 flex-wrap  max-lg:flex-col">
        <div className="flex items-start">
          <Link href="/">
            <Image
              src="/svg/footer-logo.svg"
              alt="footer-logo"
              width={100}
              height={100}
            />
          </Link>
        </div>

        <div className="flex lg:gap-30 gap-20 flex-wrap">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h4 className="text-white font-opensans text-xl mb-2">{section.title}</h4>
              <ul>
              {section.links.map((link, index) => (
                <li key={index}>
                   <Link href={link.link} className="text-white font-light">{link.name}</Link>
                </li>
                ))}
              </ul>
             

            </div>
          ))}

        </div>


        <div className="lg:mr-20">
          <h2 className="text-white font-opensans text-xl">Subscribe to our Newsletter</h2>
          <div className="flex gap-2 mt-2">
            <input type="text" placeholder="Enter your email address"  className="p-2 rounded-lg"/>
            <button className="p-2 rounded-lg bg-[#2D3B57] w-[90px] text-white">Subscribe</button>
          </div>
        </div>
      </div>


      <div className="flex items-center justify-center border-t mt-10">
        <p className="mt-4 text-white">@2024  Copyright, All rights Reserved</p>
      </div>
    </footer>
  );
}
