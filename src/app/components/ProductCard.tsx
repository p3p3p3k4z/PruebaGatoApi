'use client'; // Marcar como componente de cliente

import Link from "next/link";
import Image from "next/image";
import { Product } from "../interfaces/product";
import { useDispatch, useSelector } from "react-redux"; // Importar hooks de Redux
import { RootState } from "@/app/redux/store"; // Importar RootState para tipado
import { addFavorite, removeFavorite } from "@/app/redux/features/favorites/favoritesSlice"; // Importar acciones
import { useState, useEffect } from "react"; // Importar useState y useEffect

interface Props {
    product: Product;
}
  
export const ProductCard = ({ product }: Props) => {
    const dispatch = useDispatch(); // Hook para despachar acciones
    const favorites = useSelector((state: RootState) => state.favorites.items); // Selector para obtener favoritos
    
    // Estado local para controlar si el producto es favorito
    const [isFavorite, setIsFavorite] = useState(false);

    // Efecto para actualizar el estado de `isFavorite` cuando `favorites` o `product.id` cambian
    useEffect(() => {
        setIsFavorite(favorites.some(fav => fav.id === product.id));
    }, [favorites, product.id]);

    const handleToggleFavorite = () => {
        if (isFavorite) {
            dispatch(removeFavorite(product.id));
        } else {
            dispatch(addFavorite(product));
        }
    };

    return (
        <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-md w-full max-w-xs transition-transform duration-200 hover:scale-105">
            <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                <Image 
                    src={product.image}
                    alt={ product.title }
                    layout="fill"
                    objectFit="cover"
                    priority={ false }
                    className="rounded-t-lg"
                />
                {/* Botón de favoritos */}
                <button 
                    onClick={handleToggleFavorite}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg text-xl"
                    aria-label={isFavorite ? "Eliminar de favoritos" : "Agregar a favoritos"}
                >
                    {isFavorite ? '❤️' : '🤍'} {/* Corazón lleno si es favorito, vacío si no */}
                </button>
            </div>
            
            <div className="p-4 flex flex-col items-center justify-center text-center">
                <p className="text-lg font-semibold text-gray-800 capitalize mb-2 line-clamp-1">{ product.title }</p>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{ product.description }</p>
                <p className="text-xl font-bold text-gray-900 mb-4">${ product.price.toFixed(2) }</p>

                <Link
                    href={`/productos/${ product.id }`}
                    className="inline-block bg-blue-500 text-white rounded-full py-2 px-6 text-sm font-semibold hover:bg-blue-600 transition duration-300"
                >
                    Ver Detalles
                </Link>
            </div>
        </div>
    )
}