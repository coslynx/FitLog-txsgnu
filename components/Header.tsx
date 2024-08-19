"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/store';

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout } = useStore();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="FitLog Logo"
            width={100}
            height={50}
            className="cursor-pointer"
          />
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
            Dashboard
          </Link>
          <Link href="/goals" className="text-gray-600 hover:text-gray-900">
            Goals
          </Link>
          <Link href="/workouts" className="text-gray-600 hover:text-gray-900">
            Workouts
          </Link>
          <Link href="/meals" className="text-gray-600 hover:text-gray-900">
            Meals
          </Link>
          <Link href="/friends" className="text-gray-600 hover:text-gray-900">
            Friends
          </Link>
        </nav>
        <div className="flex items-center">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <Image
                  src={user.image}
                  alt="Profile Picture"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <span className="ml-2">{user.name}</span>
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 py-2 px-4 bg-white rounded-md shadow-md">
                  <Link href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-red-500 hover:bg-red-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/api/auth/signin" className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}