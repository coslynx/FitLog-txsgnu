"use client";

import Link from "next/link";
import { useStore } from "@/store";

export default function Navigation() {
  const { user } = useStore();

  return (
    <nav className="bg-gray-100 py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
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
        </div>
        {user && (
          <Link href="/profile" className="text-gray-600 hover:text-gray-900">
            Profile
          </Link>
        )}
      </div>
    </nav>
  );
}