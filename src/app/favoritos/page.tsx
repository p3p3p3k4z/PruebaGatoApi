// src/app/favoritos/page.tsx
//npm install @reduxjs/toolkit react-redux

'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { ProductGrid } from '../components/ProductGrid'; 
import Link from 'next/link';

export default function FavoritesPage() {
  const favorites = useSelector((state: RootState) => state.favorites.items);

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] text-center p-4">
        <span className="text-4xl font-bold text-gray-700 mb-4">¡Aún no tienes gatitos favoritos! 😿</span>
        <p className="text-xl text-gray-600">Marca algunos gatitos con un ❤️ para verlos aquí.</p>
        <Link href="/productos" className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
          Explorar Gatitos
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Tus Gatitos Favoritos ❤️</h1>
      {/* Pasamos la lista de favoritos al ProductGrid */}
      <ProductGrid products={favorites} />
    </div>
  );
}