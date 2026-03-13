'use client';
import Link from "next/link";
import Image from "next/image";
import logo from '@/assets/images/lm-logo.svg'
import { useSession } from 'next-auth/react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { data: session } = useSession();

    return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo + tagline */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="flex items-center gap-2">
              <Image src={logo} alt="LM Lettings" className="h-8 w-auto" />
              <span className="text-white text-xl font-bold">LM Lettings</span>
            </span>
            <p className="text-gray-500 text-sm">Find your perfect UK rental</p>
          </div>

          {/* Links */}
          <ul className="flex items-center gap-6 text-sm text-gray-400">
            <li>
              <Link href="/properties" className="hover:text-white transition-colors">
                Properties
              </Link>
            </li>
            {session && (
            <li>
              <Link href="/properties/add" className="hover:text-white transition-colors">
                Add Property
              </Link>
            </li>
            )}
          </ul>

          {/* Copyright */}
          <p className="text-sm text-gray-500">
            &copy; {currentYear} LM Lettings. All rights reserved. |{' '}
            <a href="https://lmiddleton.co.uk/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              lmiddleton.co.uk
            </a>
          </p>

        </div>
      </div>
    </footer>
    );
}

export default Footer;
