// app/productos/page.tsx
import { Product } from "../interfaces/product";
import { ProductGrid } from "../components/ProductGrid";
import Link from "next/link"; 

const THE_CAT_API_KEY = process.env.CAT_API_KEY || 'live_wcNMZuSfFbTpyPg4pc64MZYAaa4rVxTqzI1VusfCn7lUAZZ3ZFxDj2TDzyFCkByh'; 
const ITEMS_PER_PAGE = 9; 

const get_products = async (page: number = 0): Promise<Product[]> => {
  try {
    const res = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${ITEMS_PER_PAGE}&page=${page}&has_breeds=1&order=RANDOM`, {
      headers: {
        'x-api-key': THE_CAT_API_KEY,
      },
      next: {
        revalidate: 60, 
      },
    });

    if (!res.ok) {
      console.error(`Error al cargar imágenes de gatos (Página ${page}): ${res.status} ${res.statusText}`);
      throw new Error(`No se pudieron cargar las imágenes de gatos: ${res.statusText}`);
    }

    const data: any[] = await res.json();

    const products: Product[] = data.map((catImage: any) => {
      const breed = catImage.breeds && catImage.breeds.length > 0 ? catImage.breeds[0] : null;

      return {
        id: catImage.id,             
        title: breed ? breed.name : `Gatito Lindo`, 
        price: parseFloat((Math.random() * (150 - 50) + 50).toFixed(2)), // Asegurarse que el precio sea un número
        description: breed ? breed.temperament : 'Un gato adorable y juguetón.', 
        category: breed ? breed.origin : 'Desconocida', 
        image: catImage.url,         
      };
    }).filter(product => product.image); // Filtra productos sin imagen válida

    console.log('Productos obtenidos y mapeados:', products.length, 'productos');

    return products;

  } catch (error) {
    console.error("Error al obtener productos de gatos:", error);
    return []; 
  }
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const currentPage = Number(searchParams.page) || 0; 

  const products: Product[] = await get_products(currentPage);

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] text-center p-4">
        <span className="text-4xl font-bold text-gray-700 mb-4">¡Oops! No se encontraron gatitos.</span>
        <p className="text-xl text-gray-600">Puede que haya un problema con la API o que no haya más gatos en esta página.</p>
        <Link href="/productos" className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8"> 
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Nuestros Adorables Gatitos</h1>

      <ProductGrid products={products} />

      <div className="flex justify-between items-center my-8">
        <Link
          href={`/productos?page=${Math.max(0, currentPage - 1)}`}
          className={`px-6 py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          aria-disabled={currentPage === 0}
          prefetch={false} 
        >
          Anterior
        </Link>

        <span className="text-xl font-semibold text-gray-700">Página {currentPage + 1}</span>

        <Link
          href={`/productos?page=${currentPage + 1}`}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-700"
          prefetch={false}
        >
          Siguiente
        </Link>
      </div>
    </div>
  );
}