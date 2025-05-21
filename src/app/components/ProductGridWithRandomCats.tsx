// components/ProductGridWithRandomCats.tsx
'use client'; // ¡Importante! Marca este archivo como un Client Component

import { useState, useEffect, useCallback, useRef } from 'react';
import { Product } from '../interfaces/product'; // Asegúrate de que la ruta sea correcta
import { ProductCard } from './ProductCard'; // Tu ProductCard existente

// Tu API Key de The Cat API
const THE_CAT_API_KEY = 'live_wcNMZuSfFbTpyPg4pc64MZYAaa4rVxTqzI1VusfCn7lUAZZ3ZFxDj2TDzyFCkByh';
const ITEMS_PER_LOAD = 1; // Cuántos gatitos cargar en cada solicitud

export const ProductGridWithRandomCats = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true); // Para saber si aún hay más gatitos por cargar
  const currentPage = useRef(0); // Usamos useRef para mantener la página actual entre renders

  // Función para obtener los gatitos de la API
  const fetchRandomCats = useCallback(async (page: number): Promise<Product[]> => {
    setError(null); // Limpiar errores anteriores
    try {
      // The Cat API /search por defecto trae aleatorios.
      // Usamos el parámetro 'page' para simular paginación si el usuario hace scroll para más.
      const res = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${ITEMS_PER_LOAD}&page=${page}`, {
        headers: {
          'x-api-key': THE_CAT_API_KEY,
        },
        // No necesitamos 'cache' o 'revalidate' aquí porque es un fetch del lado del cliente
        // que se ejecuta cada vez.
      });

      if (!res.ok) {
        throw new Error(`Error al cargar imágenes de gatos: ${res.status} ${res.statusText}`);
      }

      const data: any[] = await res.json();

      // Mapeamos los datos de The Cat API a tu interfaz Product
      const newProducts: Product[] = data.map((catImage: any) => ({
        id: catImage.id, // El ID de The Cat API es un string
        title: `Gatito Aleatorio - ID: ${catImage.id}`, // Generamos un título único
        price: Math.floor(Math.random() * 100) + 10, // Generamos un precio aleatorio
        description: `Descubre a este adorable gatito. Su ID de imagen es ${catImage.id}, y tiene unas dimensiones de ${catImage.width}x${catImage.height} píxeles.`, // Generamos una descripción
        category: catImage.breeds && catImage.breeds.length > 0 ? catImage.breeds[0].name : 'Gato Genérico', // Usamos la raza si existe
        image: catImage.url, // La 'url' de la imagen en The Cat API es tu campo 'image'
      }));

      return newProducts;

    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al cargar los gatitos.');
      return []; // Devolver un array vacío en caso de error
    }
  }, []); // El useCallback no tiene dependencias porque THE_CAT_API_KEY y ITEMS_PER_LOAD son constantes

  // Función para cargar más productos (usada para la carga inicial y el scroll)
  const loadMoreProducts = useCallback(async () => {
    if (loading || !hasMore) return; // Evitar múltiples cargas simultáneas
    
    setLoading(true);
    const newCats = await fetchRandomCats(currentPage.current);

    if (newCats.length > 0) {
      setProducts(prevProducts => [...prevProducts, ...newCats]);
      currentPage.current += 1; // Incrementa la página para la próxima carga
    } else {
      setHasMore(false); // No hay más productos
    }
    setLoading(false);
  }, [loading, hasMore, fetchRandomCats]);


  // Efecto para la carga inicial de productos cuando el componente se monta
  useEffect(() => {
    loadMoreProducts();
  }, [loadMoreProducts]);

  // Efecto para la detección de scroll (Infinite Scroll)
  useEffect(() => {
    const handleScroll = () => {
      // Detectar si el usuario está cerca del final de la página
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading && hasMore) {
        loadMoreProducts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Limpieza del listener
  }, [loading, hasMore, loadMoreProducts]);


  return (
    <div className="flex flex-col">
      {error && <p className="text-red-500 text-center my-4">{error}</p>}
      
      <div className="flex flex-wrap gap-10 items-center justify-center">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />            
        ))}
      </div>
      
      {loading && <p className="text-center my-4">Cargando más gatitos aleatorios...</p>}
      {!hasMore && !loading && !error && <p className="text-center my-4">No hay más gatitos disponibles.</p>}
      
      {/* Puedes agregar un botón para cargar más si prefieres no usar Infinite Scroll */}
      {/* {hasMore && !loading && (
        <button 
          onClick={loadMoreProducts} 
          className="mt-8 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Cargar más
        </button>
      )} */}
    </div>
  );
};