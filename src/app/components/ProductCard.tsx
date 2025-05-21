// components/ProductCard.tsx
import Link from "next/link";
import Image from "next/image";
import { Product } from "../interfaces/product"; // Asegúrate de que esta ruta sea correcta


interface Props {
    product: Product;
}
  
export const ProductCard = ({ product }: Props) => {
    return (
        // Contenedor principal de la tarjeta.
        // max-w-sm: para limitar el ancho en pantallas pequeñas (aprox. 512px).
        // w-full: para que ocupe todo el ancho disponible si no hay un max-w.
        // rounded-lg: Bordes más suaves.
        // shadow-md: Sombra.
        <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-md w-full max-w-xs transition-transform duration-200 hover:scale-105">
            <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                <Image 
                    src={product.image}
                    alt={ product.title }
                    // layout="fill" para que la imagen ocupe todo el espacio del div padre.
                    // objectFit="cover" para que la imagen cubra el área sin deformarse.
                    layout="fill"
                    objectFit="cover"
                    priority={ false } // Para cargar imágenes secundarias más tarde
                    className="rounded-t-lg" // Solo la parte superior redondeada
                />
            </div>
            
            <div className="p-4 flex flex-col items-center justify-center text-center">
                <p className="text-lg font-semibold text-gray-800 capitalize mb-2 line-clamp-1">{ product.title }</p> {/* Título más compacto */}
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{ product.description }</p> {/* Descripción más pequeña, truncada */}
                <p className="text-xl font-bold text-gray-900 mb-4">${ product.price.toFixed(2) }</p> {/* Precio */}

                <Link
                    href={`/productos/${ product.id }`} // Asegúrate de que la ruta es correcta.
                    className="inline-block bg-blue-500 text-white rounded-full py-2 px-6 text-sm font-semibold hover:bg-blue-600 transition duration-300"
                >
                    Ver Detalles
                </Link>
            </div>
        </div>
    )
}