// productos/page.tsx
import { Product } from "../interfaces/product";
import { ProductGrid } from "../components/ProductGrid";

// Tu API Key de The Cat API
const THE_CAT_API_KEY = 'live_wcNMZuSfFbTpyPg4pc64MZYAaa4rVxTqzI1VusfCn7lUAZZ3ZFxDj2TDzyFCkByh';

const get_products = async (): Promise<Product[]> => {
  // Solicitamos 20 imágenes de gatos. 
  // Usamos el header 'x-api-key' con tu clave.
  const res = await fetch(`https://api.thecatapi.com/v1/images/search?limit=20`, {
    headers: {
      'x-api-key': THE_CAT_API_KEY,
    }
  });

  if (!res.ok) {
    console.error(`Error al cargar imágenes de gatos: ${res.status} ${res.statusText}`);
    throw new Error('No se pudieron cargar las imágenes de gatos. Verifica la API Key o la conexión.');
  }

  const data: any[] = await res.json(); // La respuesta es un array de objetos de imagen

  const products: Product[] = data.map((catImage: any) => ({
    // Mapeamos los campos de The Cat API a tu interfaz Product
    id: catImage.id,             // El ID de The Cat API es un string
    title: `Gatito de The Cat API - ID: ${catImage.id}`, // Generamos un título único
    price: Math.floor(Math.random() * 100) + 10, // Generamos un precio aleatorio entre 10 y 109
    description: `Descubre a este adorable gatito. Su ID de imagen es ${catImage.id}, y tiene unas dimensiones de ${catImage.width}x${catImage.height} píxeles.`, // Generamos una descripción
    category: catImage.breeds && catImage.breeds.length > 0 ? catImage.breeds[0].name : 'Gato Genérico', // Usamos la raza si existe, sino un genérico
    image: catImage.url,         // La 'url' de la imagen en The Cat API es tu campo 'image'
  }));

  return products;
};

export default async function ProductsPage() {
  const products: Product[] = await get_products();

  return(
    <div className="flex flex-col">
      <span className="text-5xl my-2">Nuestra Galería de Gatitos</span>
      
      <ProductGrid products={ products } />

    </div>
  );
}