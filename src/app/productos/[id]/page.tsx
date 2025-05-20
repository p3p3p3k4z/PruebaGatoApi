// productos/[id]/page.tsx
import { Product } from '@/app/interfaces/product'; // Asegúrate de que la ruta sea correcta
import Image from 'next/image';
import { notFound } from 'next/navigation';

// ¡IMPORTANTE! Para un entorno de producción, esta clave debería estar en un archivo .env.local
// y accesible como process.env.NEXT_PUBLIC_THE_CAT_API_KEY.
const THE_CAT_API_KEY = 'live_wcNMZuSfFbTpyPg4pc64MZYAaa4rVxTqzI1VusfCn7lUAZZ3ZFxDj2TDzyFCkByh';

export async function generateStaticParams() {
  // Obtenemos una muestra de IDs de la API para pre-renderizar algunas páginas estáticas.
  // Es vital usar la API Key aquí también.
  const res = await fetch(`https://api.thecatapi.com/v1/images/search?limit=5`, {
    headers: {
      'x-api-key': THE_CAT_API_KEY,
    }
  });

  if (!res.ok) {
    console.error(`Error al obtener IDs para generateStaticParams: ${res.status} ${res.statusText}`);
    return []; // Si falla la obtención de IDs, no generamos rutas estáticas.
  }
  
  const data: any[] = await res.json();
  
  // Los IDs de The Cat API son strings, así que los retornamos tal cual.
  return data.map(catImage => ({
    id: catImage.id,
  }));
}

const getProductById = async (id: string): Promise<Product> => {
  try {
    // Realizamos la solicitud a la API para obtener los detalles de la imagen por su ID.
    const res = await fetch(`https://api.thecatapi.com/v1/images/${id}`, {
      next: { revalidate: 60 }, // Revalida la página cada 60 segundos si se accede nuevamente.
      headers: {
        'x-api-key': THE_CAT_API_KEY,
      }
    });

    if (!res.ok) {
      // Si la respuesta no es exitosa (ej. 404), invocamos notFound() para mostrar la página personalizada.
      console.error(`Error al cargar el producto con ID ${id}: ${res.status} ${res.statusText}`);
      notFound(); 
    }

    const catImage: any = await res.json();

    // Mapeamos los datos de The Cat API a tu interfaz Product,
    // generando valores para los campos que no existen directamente en la API.
    return {
      id: catImage.id, // El ID de The Cat API es un string
      title: `Detalles del Gatito con ID: ${catImage.id}`,
      price: Math.floor(Math.random() * 100) + 10, // Genera un precio aleatorio
      description: `Aquí está una vista más cercana de un lindo gatito con el ID: ${catImage.id}. Esta imagen tiene unas dimensiones de ${catImage.width}x${catImage.height} píxeles.`,
      category: catImage.breeds && catImage.breeds.length > 0 ? catImage.breeds[0].name : 'Gato sin Raza Específica', // Usa la raza si existe, sino un genérico
      image: catImage.url, // La URL de la imagen en The Cat API es tu campo 'image'
    };
  } catch (error) {
    // Capturamos cualquier error en la solicitud (ej. problemas de red) y también mostramos 404.
    console.error("Error en getProductById:", error);
    notFound();
  }
};

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      
      <div className="relative w-96 h-96 mb-6">
        {/* El componente Image de Next.js. Asegúrate de que 'src' apunte a 'product.image' */}
        <Image 
          src={product.image} 
          alt={product.title} 
          layout="fill" 
          objectFit="contain" 
          className="rounded-lg shadow-lg p-2 bg-white"
        />
      </div>

      <p className="text-lg text-gray-700 mb-2 font-semibold">${product.price}</p>
      <p className="text-gray-600 text-center mb-4">{product.description}</p>
      <p className="text-sm text-gray-500">Categoría: {product.category}</p>

      {/* Condicional para mostrar la raza si es específica */}
      {product.category !== 'Gato sin Raza Específica' && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
          <p className="font-semibold">Esta imagen es de la raza: {product.category}</p>
        </div>
      )}
    </div>
  );
}