import Link from "next/link";
import Image from "next/image";
import { Product } from "../interfaces/product";


interface Props {
    product: Product;
  }

//   export interface Product {
//     id:          number;
//     title:       string;
//     price:       number;
//     description: string;
//     category:    string;
//     image:       string;
// }
  
export const ProductCard = ({ product }:Props) => {

    //const { id, title } = product;
  
  
    return (
      <div className="mx-auto right-0 mt-2 w-60">
        <div className="flex flex-col bg-white rounded overflow-hidden shadow-lg">
          <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-800 border-b">
  
            <Image 
                key={ product.id }
                src={product.image}
                width={100}
                height={100}
                alt={ product.title }
                priority={ false }
              />
  
  
            <p className="pt-2 text-lg font-semibold text-gray-50 capitalize">{ product.title }</p>
            <div className="mt-5">
              <Link
                href={`productos/${ product.id }`}
                className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100"
              >
                Más información
              </Link>
            </div>
          </div>         
  
        </div>
      </div>
    )
  }