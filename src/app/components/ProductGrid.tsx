import { Product } from "../interfaces/product";
import { ProductCard } from "./ProductCard";

interface Props {
    products: Product[];
  }

  
export const ProductGrid = ({ products }: Props) => {
    return (
      <div className="flex flex-wrap gap-10 items-center justify-center">
  
          {
            products.map( product => (
              <ProductCard key={ product.id } product={product} />            
            ))
          }
          
      </div>
    )
  }