// components/ProductGrid.tsx
import { Product } from "../interfaces/product"; // Asegúrate de que esta ruta sea correcta
import { ProductCard } from "./ProductCard";

interface Props {
    products: Product[];
}
  
export const ProductGrid = ({ products }: Props) => {
    return (
        // `grid`: Activa el sistema de cuadrícula de CSS Grid.
        // `grid-cols-1`: Por defecto, una columna en pantallas muy pequeñas.
        // `sm:grid-cols-2`: En pantallas pequeñas (sm breakpoint, ~640px), dos columnas.
        // `md:grid-cols-3`: En pantallas medianas (md breakpoint, ~768px), tres columnas.
        // `gap-6`: Espacio de 6 unidades entre las tarjetas.
        // `justify-items-center`: Centra cada ítem dentro de su celda de la cuadrícula.
        // `p-4`: Padding alrededor de la cuadrícula.
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 justify-items-center">
            {
                products.map( product => (
                    <ProductCard key={ product.id } product={product} />            
                ))
            }
        </div>
    )
}